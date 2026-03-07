import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import {
  FailureAttemptLog,
  FailureErrorSnapshot,
} from "./failure-queue.mongoEntity";

@Entity("failure_dead_letter")
export class FailureDeadLetterMongoEntity {
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
  attempts!: number;

  @Column()
  firstError!: FailureErrorSnapshot;

  @Column()
  finalError!: FailureErrorSnapshot;

  @Column()
  attemptLogs!: FailureAttemptLog[];

  @Column()
  createdAt!: Date;

  @Column()
  archivedAt!: Date;
}
