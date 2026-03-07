import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

export interface FailureErrorSnapshot {
  name?: string;
  message: string;
  stack?: string;
  raw?: unknown;
}

export interface FailureAttemptLog {
  attempt: number;
  error: FailureErrorSnapshot;
  occurredAt: Date;
}

@Entity("failure_queue")
export class FailureQueueMongoEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  type!: string;

  @Column()
  entity!: Record<string, unknown>;

  @Column()
  metadata!: Record<string, unknown>;

  @Column()
  maxRetries!: number;

  @Column()
  retryIntervalMs!: number;

  @Column()
  attempts!: number;

  @Column()
  nextRetryAt!: Date;

  @Column()
  lastError!: FailureErrorSnapshot;

  @Column()
  attemptLogs!: FailureAttemptLog[];

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
