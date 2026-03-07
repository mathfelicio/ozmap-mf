import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { IFailureHandlerService } from "../../domain/interfaces/failure-handler.interface";
import { FailureQueueMongoEntity } from "../../infrastructure/entities/failure-queue.mongoEntity";

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_INTERVAL_MS = 60_000;

@Injectable()
export class FailureHandlerService implements IFailureHandlerService {
  constructor(
    @InjectRepository(FailureQueueMongoEntity, "mongodb")
    private readonly queueRepository: MongoRepository<FailureQueueMongoEntity>,
  ) {}

  handleFailure(
    type: string,
    data: any,
    error: any,
    options?: {
      maxRetries?: number;
      retryIntervalMs?: number;
      metadata?: Record<string, any>;
    },
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
