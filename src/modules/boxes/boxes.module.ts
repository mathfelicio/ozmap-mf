import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateBoxHandler } from "./application/commands/create-box.handler";
import { SyncBoxesOzmapHandler } from "./application/commands/sync-boxes-ozmap.handler";
import { CreateBoxUseCase } from "./application/use-cases/create-box.use-case";
import { SyncBoxesOzmapUseCase } from "./application/use-cases/sync-boxes-ozmap.use-case";
import { BOX_REPOSITORY } from "./domain/repositories/box.repository";
import { BoxTypeormRepository } from "./infrastructure/repositories/box-typeorm.repository";
import { OzmSdkModule } from "../ozm-sdk/ozm-sdk.module";
import { FailuresModule } from "../../common/failures/failures.module";

@Module({
  imports: [CqrsModule, OzmSdkModule, FailuresModule],
  providers: [
    CreateBoxHandler,
    SyncBoxesOzmapHandler,
    CreateBoxUseCase,
    SyncBoxesOzmapUseCase,
    BoxTypeormRepository,
    {
      provide: BOX_REPOSITORY,
      useClass: BoxTypeormRepository,
    },
  ],
  exports: [BOX_REPOSITORY, BoxTypeormRepository],
})
export class BoxesModule {}
