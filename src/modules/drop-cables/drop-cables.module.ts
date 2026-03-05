import { Module } from "@nestjs/common";
import { DROP_CABLE_REPOSITORY } from "./domain/repositories/drop-cable.repository";
import { DropCableTypeormRepository } from "./infrastructure/repositories/drop-cable-typeorm.repository";

@Module({
  providers: [
    DropCableTypeormRepository,
    {
      provide: DROP_CABLE_REPOSITORY,
      useClass: DropCableTypeormRepository,
    },
  ],
  exports: [DROP_CABLE_REPOSITORY, DropCableTypeormRepository],
})
export class DropCablesModule {}

