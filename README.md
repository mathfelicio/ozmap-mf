# Teste Tecnico OZmap - Ambiente Docker

Este repositorio contem um ambiente Docker pronto para executar o teste tecnico de integracao de dados ISP com OZmap.

## O que sobe com docker-compose

- `app`: servico Node.js + TypeScript para sincronizacao periodica.
- `isp-mock`: API mock do ISP com `json-server` (porta `4000`).
- `ozmap-mock`: API mock do OZmap com `json-server` (porta `5000`).
- `mongodb`: persistencia dos snapshots da sincronizacao (porta `27017`).
- `postgres`: banco relacional para persistencia (porta `5432`).

## Pre-requisitos

- Docker
- Docker Compose

## Como rodar

```bash
docker compose up --build -d
```

Se estiver migrando de uma versao anterior do compose deste projeto, faca limpeza antes:

```bash
docker compose down -v --remove-orphans
docker compose up --build -d
```

Acompanhar logs:

```bash
docker compose logs -f app
```

Parar ambiente:

```bash
docker compose down
```

Remover volume do MongoDB:

```bash
docker compose down -v
```

## Endpoints uteis

- ISP Mock: `http://localhost:4000/cables`
- ISP Mock: `http://localhost:4000/boxes`
- OZmap Mock logs: `http://localhost:5000/sync_logs`

## Variaveis de ambiente da app

Definidas no `docker-compose.yml`:

- `ISP_API_BASE_URL=http://isp-mock:4000`
- `OZMAP_API_BASE_URL=http://ozmap-mock:5000`
- `MONGODB_URI=mongodb://root:root@mongodb:27017/ozmap_integration?authSource=admin`
- `DATABASE_URL=postgres://postgres:postgres@postgres:5432/ozmap_integration`
- `SYNC_INTERVAL_SECONDS=60`
- `ISP_RATE_LIMIT_PER_MINUTE=50`

## Troubleshooting

- Erro `getaddrinfo ENOTFOUND mongodb`:
  - Isso acontece quando a app roda fora do Docker usando `mongodb` como host.
  - Para execucao local, use `MONGODB_URI=mongodb://root:root@localhost:27017/ozmap_integration?authSource=admin`.
  - No `docker compose`, o host correto continua sendo `mongodb` (ja definido no `docker-compose.yml`).

## Estrutura

```text
.
|-- Dockerfile
|-- docker-compose.yml
|-- package.json
|-- tsconfig.json
|-- src/
|   `-- index.ts
`-- mocks/
    |-- isp/db.json
    `-- ozmap/db.json
```

## Observacoes para evolucao do teste

- Trocar o `sendToOzmapMock` para uso real do `ozmap@ozmap-sdk`.
- Implementar transformacao para entidades reais do OZmap.
- Adicionar retries exponenciais + dead-letter para falhas recorrentes.
- Adicionar testes unitarios/integracao e pipeline CI.
