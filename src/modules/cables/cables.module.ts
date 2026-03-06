import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateCableHandler } from "./application/commands/create-cable.handler";
import { SyncCablesOzmapHandler } from "./application/commands/sync-cables-ozmap.handler";
import { CreateCableUseCase } from "./application/use-cases/create-cable.use-case";
import { SyncCablesOzmapUseCase } from "./application/use-cases/sync-cables-ozmap.use-case";
import { CABLE_REPOSITORY } from "./domain/repositories/cable.repository";
import { CableTypeormRepository } from "./infrastructure/repositories/cable-typeorm.repository";
import { BoxesModule } from "../boxes/boxes.module";
import { OzmSdkModule } from "../ozm-sdk/ozm-sdk.module";

@Module({
  imports: [CqrsModule, BoxesModule, OzmSdkModule],
  providers: [
    CreateCableHandler,
    SyncCablesOzmapHandler,
    CreateCableUseCase,
    SyncCablesOzmapUseCase,
    CableTypeormRepository,
    {
      provide: CABLE_REPOSITORY,
      useClass: CableTypeormRepository,
    },
  ],
  exports: [CABLE_REPOSITORY, CableTypeormRepository],
})
export class CablesModule {}
