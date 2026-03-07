import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { BoxesModule } from "../boxes/boxes.module";
import { CablesModule } from "../cables/cables.module";
import { CustomersModule } from "../customers/customers.module";
import { DropCablesModule } from "../drop-cables/drop-cables.module";
import { RunIspSyncHandler } from "./application/commands/run-isp-sync.handler";
import { RunOzmapSyncHandler } from "./application/commands/run-ozmap-sync.handler";
import { RunIspSyncUseCase } from "./application/use-cases/run-isp-sync.use-case";
import { RunOzmapSyncUseCase } from "./application/use-cases/run-ozmap-sync.use-case";
import { IspSyncCron } from "./presentation/crons/isp-sync.cron";

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    BoxesModule,
    CablesModule,
    CustomersModule,
    DropCablesModule,
  ],
  controllers: [],
  providers: [
    RunIspSyncHandler,
    RunOzmapSyncHandler,
    RunIspSyncUseCase,
    RunOzmapSyncUseCase,
    IspSyncCron,
  ],
})
export class IspSyncModule {}
