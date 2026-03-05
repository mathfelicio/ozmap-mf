import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CableOrmEntity } from "../../../cables/infrastructure/entities/cable-orm.entity";
import { CustomerOrmEntity } from "../../../customers/infrastructure/entities/customer-orm.entity";
import { DropCableOrmEntity } from "../../../drop-cables/infrastructure/entities/drop-cable-orm.entity";

@Entity("boxes")
export class BoxOrmEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ name: "name", type: "varchar", length: 120 })
  name!: string;

  @Column({ name: "type", type: "varchar", length: 40 })
  type!: string;

  @Column({ name: "lat", type: "float" })
  lat!: number;

  @Column({ name: "lng", type: "float" })
  lng!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @OneToMany(() => CustomerOrmEntity, (customer) => customer.box)
  customers?: CustomerOrmEntity[];

  @OneToMany(() => DropCableOrmEntity, (dropCable) => dropCable.box)
  dropCables?: DropCableOrmEntity[];

  @ManyToMany(() => CableOrmEntity, (cable) => cable.boxes)
  cables?: CableOrmEntity[];
}
