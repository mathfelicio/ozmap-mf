import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoxOrmEntity } from "../../../boxes/infrastructure/entities/box-orm.entity";
import { CustomerOrmEntity } from "../../../customers/infrastructure/entities/customer-orm.entity";

@Entity("drop_cables")
export class DropCableOrmEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ name: "name", type: "varchar", length: 120 })
  name!: string;

  @Column({ name: "box_id", type: "int" })
  boxId!: number;

  @ManyToOne(() => BoxOrmEntity, {
    onDelete: "NO ACTION",
    nullable: false,
  })
  @JoinColumn({ name: "box_id" })
  box?: BoxOrmEntity;

  @Column({ name: "customer_id", type: "int" })
  customerId!: number;

  @ManyToOne(() => CustomerOrmEntity, {
    onDelete: "NO ACTION",
    nullable: false,
  })
  @JoinColumn({ name: "customer_id" })
  customer?: CustomerOrmEntity;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date | null;
}
