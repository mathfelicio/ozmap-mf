import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateCableHandler } from "./application/commands/create-cable.handler";
import { CreateCableUseCase } from "./application/use-cases/create-cable.use-case";
import { CABLE_REPOSITORY } from "./domain/repositories/cable.repository";
import { CableTypeormRepository } from "./infrastructure/repositories/cable-typeorm.repository";

@Module({
  imports: [CqrsModule],
  providers: [
    CreateCableHandler,
    CreateCableUseCase,
    CableTypeormRepository,
    {
      provide: CABLE_REPOSITORY,
      useClass: CableTypeormRepository,
    },
  ],
  exports: [CABLE_REPOSITORY, CableTypeormRepository],
})
export class CablesModule {}
