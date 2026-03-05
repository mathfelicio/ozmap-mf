import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoxOrmEntity } from "../../../boxes/infrastructure/entities/box-orm.entity";
import { DropCableOrmEntity } from "../../../drop-cables/infrastructure/entities/drop-cable-orm.entity";

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

  @ManyToOne(() => BoxOrmEntity, {
    onDelete: "NO ACTION",
    nullable: false,
  })
  @JoinColumn({ name: "box_id" })
  box?: BoxOrmEntity;

  @OneToMany(() => DropCableOrmEntity, (dropCable) => dropCable.customer)
  dropCables?: DropCableOrmEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date | null;
}
