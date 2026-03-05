import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { Cable } from "../entities/cable.entity";

export const CABLE_REPOSITORY = Symbol("CABLE_REPOSITORY");

export interface ICableRepository {
  findOne(
    criteria: FindCriteria<Cable>,
    options?: FindOptions<Cable>,
  ): Promise<Cable | null>;

  findAll(
    criteria?: FindCriteria<Cable>,
    options?: FindOptions<Cable>,
  ): Promise<Cable[]>;

  create(cable: Cable): Promise<Cable>;

  update(cable: Cable): Promise<Cable>;

  delete(cable: Cable): Promise<void>;
}

