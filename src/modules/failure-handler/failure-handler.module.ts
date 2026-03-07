import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FAILURE_PROCESSORS } from "./domain/interfaces/failure-processor.interface";
import { FailureHandlerService } from "./application/services/failure-handler.service";
import { FailureRetryService } from "./application/services/failure-retry.service";
import { FailureQueueMongoEntity } from "./infrastructure/entities/failure-queue.mongoEntity";
import { FailureDeadLetterMongoEntity } from "./infrastructure/entities/failure-dead-letter.mongoEntity";
import { FailureHandlerCron } from "./presentation/crons/failure-handler.cron";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [FailureQueueMongoEntity, FailureDeadLetterMongoEntity],
      "mongodb",
    ),
  ],
  providers: [
    FailureHandlerService,
    FailureRetryService,
    FailureHandlerCron,
    {
      provide: FAILURE_PROCESSORS,
      useValue: [],
    },
  ],
  exports: [FailureHandlerService, FailureRetryService],
})
export class FailureHandlerModule {}
