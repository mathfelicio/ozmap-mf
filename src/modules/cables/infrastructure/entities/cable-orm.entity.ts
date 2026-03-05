import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoxOrmEntity } from "../../../boxes/infrastructure/entities/box-orm.entity";

@Entity("cables")
export class CableOrmEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ name: "name", type: "varchar", length: 120 })
  name!: string;

  @Column({ name: "capacity", type: "int" })
  capacity!: number;

  @Column({ name: "boxes_connected", type: "simple-array" })
  boxesConnected!: number[];

  @Column({ name: "path", type: "simple-json" })
  path!: Array<{ lat: number; lng: number }>;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @ManyToMany(() => BoxOrmEntity, (box) => box.cables)
  @JoinTable({
    name: "cable_boxes_connected",
    joinColumn: {
      name: "cable_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "box_id",
      referencedColumnName: "id",
    },
  })
  boxes?: BoxOrmEntity[];
}
