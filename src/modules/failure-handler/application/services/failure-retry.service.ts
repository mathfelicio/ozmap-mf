import { Inject, Injectable, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import {
  FAILURE_PROCESSORS,
  IFailureProcessor,
} from "../../domain/interfaces/failure-processor.interface";
import {
  FailureAttemptLog,
  FailureErrorSnapshot,
  FailureQueueMongoEntity,
} from "../../infrastructure/entities/failure-queue.mongoEntity";
import { FailureDeadLetterMongoEntity } from "../../infrastructure/entities/failure-dead-letter.mongoEntity";

@Injectable()
export class FailureRetryService {
  constructor(
    @InjectRepository(FailureQueueMongoEntity, "mongodb")
    private readonly queueRepository: MongoRepository<FailureQueueMongoEntity>,
    @InjectRepository(FailureDeadLetterMongoEntity, "mongodb")
    private readonly deadLetterRepository: MongoRepository<FailureDeadLetterMongoEntity>,
    @Optional()
    @Inject(FAILURE_PROCESSORS)
    private readonly processors: IFailureProcessor[] = [],
  ) {}

  async processPendingFailures(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async retrySingleFailure(
    failure: FailureQueueMongoEntity,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async registerAttemptFailure(
    failure: FailureQueueMongoEntity,
    normalizedError: FailureErrorSnapshot,
    retryIntervalMs: number,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async archiveAndDelete(
    failure: FailureQueueMongoEntity,
    attemptLogs: FailureAttemptLog[],
    finalError: FailureErrorSnapshot,
    archivedAt: Date,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private normalizeError(error: unknown): FailureErrorSnapshot {
    throw new Error("Method not implemented.");
  }
}
