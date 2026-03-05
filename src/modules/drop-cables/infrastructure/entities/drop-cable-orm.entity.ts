import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("drop_cables")
export class DropCableOrmEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ name: "name", type: "varchar", length: 120 })
  name!: string;

  @Column({ name: "box_id", type: "int" })
  boxId!: number;

  @Column({ name: "customer_id", type: "int" })
  customerId!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date | null;
}

