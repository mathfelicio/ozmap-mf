import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateDropCableHandler } from "./application/commands/create-drop-cable.handler";
import { SyncDropCablesOzmapHandler } from "./application/commands/sync-drop-cables-ozmap.handler";
import { CreateDropCableUseCase } from "./application/use-cases/create-drop-cable.use-case";
import { SyncDropCablesOzmapUseCase } from "./application/use-cases/sync-drop-cables-ozmap.use-case";
import { DROP_CABLE_REPOSITORY } from "./domain/repositories/drop-cable.repository";
import { DropCableTypeormRepository } from "./infrastructure/repositories/drop-cable-typeorm.repository";
import { OzmSdkModule } from "../ozm-sdk/ozm-sdk.module";

@Module({
  imports: [CqrsModule, OzmSdkModule],
  providers: [
    CreateDropCableHandler,
    SyncDropCablesOzmapHandler,
    CreateDropCableUseCase,
    SyncDropCablesOzmapUseCase,
    DropCableTypeormRepository,
    {
      provide: DROP_CABLE_REPOSITORY,
      useClass: DropCableTypeormRepository,
    },
  ],
  exports: [DROP_CABLE_REPOSITORY, DropCableTypeormRepository],
})
export class DropCablesModule {}
