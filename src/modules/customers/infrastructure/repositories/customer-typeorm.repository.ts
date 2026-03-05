import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";

import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { Customer } from "../../domain/entities/customer.entity";
import { ICustomerRepository } from "../../domain/repositories/customer.repository";
import { CustomerOrmEntity } from "../entities/customer-orm.entity";
import { CustomerMapper } from "../mappers/customer.mapper";

@Injectable()
export class CustomerTypeormRepository implements ICustomerRepository {
  private readonly repository: Repository<CustomerOrmEntity>;

  constructor(private readonly manager: EntityManager) {
    this.repository = this.manager.getRepository(CustomerOrmEntity);
  }

  async findOne(
    criteria: FindCriteria<Customer>,
    options?: FindOptions<Customer>,
  ): Promise<Customer | null> {
    const orm = await this.repository.findOne({
      where: criteria as any,
      ...(options as any),
    });

    return orm ? CustomerMapper.toDomain(orm) : null;
  }

  async findAll(
    criteria?: FindCriteria<Customer>,
    options?: FindOptions<Customer>,
  ): Promise<Customer[]> {
    const orms = await this.repository.find({
      where: criteria as any,
      ...(options as any),
    });

    return orms.map((orm) => CustomerMapper.toDomain(orm));
  }

  async create(customer: Customer): Promise<Customer> {
    const saved = await this.repository.save(
      CustomerMapper.toPersistence(customer),
    );

    return CustomerMapper.toDomain(saved);
  }

  async update(customer: Customer): Promise<Customer> {
    const saved = await this.repository.save(
      CustomerMapper.toPersistence(customer),
    );

    return CustomerMapper.toDomain(saved);
  }

  async delete(customer: Customer): Promise<void> {
    if (customer.id === null) {
      return;
    }

    await this.repository.softDelete(customer.id);
  }
}
