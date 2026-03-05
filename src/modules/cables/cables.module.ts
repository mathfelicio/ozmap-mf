import { Module } from "@nestjs/common";
import { CABLE_REPOSITORY } from "./domain/repositories/cable.repository";
import { CableTypeormRepository } from "./infrastructure/repositories/cable-typeorm.repository";

@Module({
  providers: [
    CableTypeormRepository,
    {
      provide: CABLE_REPOSITORY,
      useClass: CableTypeormRepository,
    },
  ],
  exports: [CABLE_REPOSITORY, CableTypeormRepository],
})
export class CablesModule {}
