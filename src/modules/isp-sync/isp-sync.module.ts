import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { BoxesModule } from "../boxes/boxes.module";
import { RunIspSyncHandler } from "./application/commands/run-isp-sync.handler";
import { RunIspSyncUseCase } from "./application/use-cases/run-isp-sync.use-case";
import { IspSyncController } from "./presentation/controllers/isp-sync.controller";
import { IspSyncCron } from "./presentation/crons/isp-sync.cron";

@Module({
  imports: [CqrsModule, HttpModule, BoxesModule],
  controllers: [IspSyncController],
  providers: [
    RunIspSyncHandler,
    RunIspSyncUseCase,
    IspSyncCron,
    // { provide: ISP_SYNC_REPOSITORY, useClass: MongodbIspSyncRepository },
    // { provide: OZMAP_GATEWAY, useClass: OzmapSdkGateway },
  ],
})
export class IspSyncModule {}
