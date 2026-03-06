import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { DropCable } from "../entities/drop-cable.entity";

export const DROP_CABLE_REPOSITORY = Symbol("DROP_CABLE_REPOSITORY");

export interface IDropCableRepository {
  findOne(
    criteria: FindCriteria<DropCable>,
    options?: FindOptions<DropCable>,
  ): Promise<DropCable | null>;

  findAll(
    criteria?: FindCriteria<DropCable>,
    options?: FindOptions<DropCable>,
  ): Promise<DropCable[]>;

  create(dropCable: DropCable): Promise<DropCable>;

  upsertMany(dropCables: DropCable[]): Promise<DropCable[]>;

  update(dropCable: DropCable): Promise<DropCable>;

  delete(dropCable: DropCable): Promise<void>;
}
