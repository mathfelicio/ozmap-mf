import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { Box } from "../entities/box.entity";

export const BOX_REPOSITORY = Symbol("BOX_REPOSITORY");

export interface IBoxRepository {
  findOne(
    criteria: FindCriteria<Box>,
    options?: FindOptions<Box>,
  ): Promise<Box | null>;

  findAll(
    criteria?: FindCriteria<Box>,
    options?: FindOptions<Box>,
  ): Promise<Box[]>;

  findByIds(ids: number[]): Promise<Box[]>;

  create(box: Box): Promise<Box>;

  upsertMany(boxes: Box[]): Promise<Box[]>;

  update(box: Box): Promise<Box>;

  delete(box: Box): Promise<void>;
}
