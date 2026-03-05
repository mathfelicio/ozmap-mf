import { Module } from "@nestjs/common";
import { BOX_REPOSITORY } from "./domain/repositories/box.repository";
import { BoxTypeormRepository } from "./infrastructure/repositories/box-typeorm.repository";

@Module({
  providers: [
    BoxTypeormRepository,
    {
      provide: BOX_REPOSITORY,
      useClass: BoxTypeormRepository,
    },
  ],
  exports: [BOX_REPOSITORY, BoxTypeormRepository],
})
export class BoxesModule {}
