import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateDropCableHandler } from "./application/commands/create-drop-cable.handler";
import { CreateDropCableUseCase } from "./application/use-cases/create-drop-cable.use-case";
import { DROP_CABLE_REPOSITORY } from "./domain/repositories/drop-cable.repository";
import { DropCableTypeormRepository } from "./infrastructure/repositories/drop-cable-typeorm.repository";

@Module({
  imports: [CqrsModule],
  providers: [
    CreateDropCableHandler,
    CreateDropCableUseCase,
    DropCableTypeormRepository,
    {
      provide: DROP_CABLE_REPOSITORY,
      useClass: DropCableTypeormRepository,
    },
  ],
  exports: [DROP_CABLE_REPOSITORY, DropCableTypeormRepository],
})
export class DropCablesModule {}
