import { Customer } from "../../domain/entities/customer.entity";
import { CustomerOrmEntity } from "../entities/customer-orm.entity";

export class CustomerMapper {
  static toDomain(orm: CustomerOrmEntity): Customer {
    return Customer.rehydrate({
      id: orm.id,
      code: orm.code,
      name: orm.name,
      address: orm.address,
      boxId: orm.boxId,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt ?? null,
      deletedAt: orm.deletedAt ?? null,
    });
  }

  static toPersistence(domain: Customer): CustomerOrmEntity {
    const orm = new CustomerOrmEntity();

    if (domain.id !== null) {
      orm.id = domain.id;
    }

    orm.code = domain.code;
    orm.name = domain.name;
    orm.address = domain.address;
    orm.boxId = domain.boxId;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt;

    return orm;
  }
}

