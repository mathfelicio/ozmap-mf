import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { Customer } from "../entities/customer.entity";

export const CUSTOMER_REPOSITORY = Symbol("CUSTOMER_REPOSITORY");

export interface ICustomerRepository {
  findOne(
    criteria: FindCriteria<Customer>,
    options?: FindOptions<Customer>,
  ): Promise<Customer | null>;

  findAll(
    criteria?: FindCriteria<Customer>,
    options?: FindOptions<Customer>,
  ): Promise<Customer[]>;

  create(customer: Customer): Promise<Customer>;

  update(customer: Customer): Promise<Customer>;

  delete(customer: Customer): Promise<void>;
}
