import 'dotenv/config';
import axios from 'axios';
import Bottleneck from 'bottleneck';
import pino from 'pino';
import { MongoClient } from 'mongodb';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

const env = {
  ispApiBaseUrl: process.env.ISP_API_BASE_URL ?? 'http://localhost:4000',
  ozmapApiBaseUrl: process.env.OZMAP_API_BASE_URL ?? 'http://localhost:5000',
  mongoUri:
    process.env.MONGODB_URI ??
    'mongodb://root:root@localhost:27017/ozmap_integration?authSource=admin',
  syncIntervalSeconds: Number(process.env.SYNC_INTERVAL_SECONDS ?? 60),
  ispRateLimitPerMinute: Number(process.env.ISP_RATE_LIMIT_PER_MINUTE ?? 50)
};

const limiter = new Bottleneck({
  reservoir: env.ispRateLimitPerMinute,
  reservoirRefreshAmount: env.ispRateLimitPerMinute,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 1,
  minTime: 1200
});

const mongoClient = new MongoClient(env.mongoUri);

type IspData = {
  cables: unknown[];
  drop_cables: unknown[];
  boxes: unknown[];
  customers: unknown[];
};

async function fetchIspData(): Promise<IspData> {
  const [cables, dropCables, boxes, customers] = await Promise.all([
    limiter.schedule(() => axios.get(`${env.ispApiBaseUrl}/cables`)),
    limiter.schedule(() => axios.get(`${env.ispApiBaseUrl}/drop_cables`)),
    limiter.schedule(() => axios.get(`${env.ispApiBaseUrl}/boxes`)),
    limiter.schedule(() => axios.get(`${env.ispApiBaseUrl}/customers`))
  ]);

  return {
    cables: cables.data,
    drop_cables: dropCables.data,
    boxes: boxes.data,
    customers: customers.data
  };
}

async function persistSnapshot(rawData: IspData): Promise<void> {
  const database = mongoClient.db('ozmap_integration');
  const snapshots = database.collection('sync_snapshots');

  await snapshots.insertOne({
    source: 'isp-mock',
    syncedAt: new Date(),
    totals: {
      cables: rawData.cables.length,
      dropCables: rawData.drop_cables.length,
      boxes: rawData.boxes.length,
      customers: rawData.customers.length
    },
    payload: rawData
  });
}

async function sendToOzmapMock(rawData: IspData): Promise<void> {
  await axios.post(`${env.ozmapApiBaseUrl}/sync_logs`, {
    created_at: new Date().toISOString(),
    source: 'isp-mock',
    message: 'Dados sincronizados com sucesso',
    totals: {
      cables: rawData.cables.length,
      drop_cables: rawData.drop_cables.length,
      boxes: rawData.boxes.length,
      customers: rawData.customers.length
    }
  });
}

async function runSync(): Promise<void> {
  const startedAt = Date.now();
  logger.info('Iniciando ciclo de sincronizacao');

  try {
    const rawData = await fetchIspData();
    await persistSnapshot(rawData);
    await sendToOzmapMock(rawData);

    logger.info(
      {
        durationMs: Date.now() - startedAt,
        totals: {
          cables: rawData.cables.length,
          dropCables: rawData.drop_cables.length,
          boxes: rawData.boxes.length,
          customers: rawData.customers.length
        }
      },
      'Ciclo de sincronizacao concluido'
    );
  } catch (error) {
    logger.error({ err: error }, 'Falha no ciclo de sincronizacao');
  }
}

async function main(): Promise<void> {
  await mongoClient.connect();
  logger.info('Conectado ao MongoDB');

  await runSync();

  setInterval(() => {
    void runSync();
  }, env.syncIntervalSeconds * 1000);

  logger.info({ everySeconds: env.syncIntervalSeconds }, 'Agendamento iniciado');
}

main().catch((error) => {
  logger.fatal({ err: error }, 'Erro fatal ao iniciar aplicacao');
  process.exit(1);
});
