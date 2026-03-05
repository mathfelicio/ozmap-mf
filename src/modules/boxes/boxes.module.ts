import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateBoxHandler } from "./application/commands/create-box.handler";
import { CreateBoxUseCase } from "./application/use-cases/create-box.use-case";
import { BOX_REPOSITORY } from "./domain/repositories/box.repository";
import { BoxTypeormRepository } from "./infrastructure/repositories/box-typeorm.repository";

@Module({
  imports: [CqrsModule],
  providers: [
    CreateBoxHandler,
    CreateBoxUseCase,
    BoxTypeormRepository,
    {
      provide: BOX_REPOSITORY,
      useClass: BoxTypeormRepository,
    },
  ],
  exports: [BOX_REPOSITORY, BoxTypeormRepository],
})
export class BoxesModule {}
