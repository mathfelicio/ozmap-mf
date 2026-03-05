import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("customers")
export class CustomerOrmEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ name: "code", type: "varchar", length: 32 })
  code!: string;

  @Column({ name: "name", type: "varchar", length: 120 })
  name!: string;

  @Column({ name: "address", type: "varchar", length: 255 })
  address!: string;

  @Column({ name: "box_id", type: "int" })
  boxId!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date | null;
}

