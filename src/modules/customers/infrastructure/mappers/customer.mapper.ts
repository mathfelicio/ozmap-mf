import { Customer } from "../../domain/entities/customer.entity";
import { BoxMapper } from "../../../boxes/infrastructure/mappers/box.mapper";
import { DropCableMapper } from "../../../drop-cables/infrastructure/mappers/drop-cable.mapper";
import { CustomerOrmEntity } from "../entities/customer-orm.entity";

interface MapOptions {
  relations?: boolean;
}

export class CustomerMapper {
  static toDomain(orm: CustomerOrmEntity, options: MapOptions = {}): Customer {
    const customer = Customer.rehydrate({
      id: orm.id,
      code: orm.code,
      name: orm.name,
      address: orm.address,
      boxId: orm.boxId,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt ?? null,
      deletedAt: orm.deletedAt ?? null,
    });

    if (options.relations !== false) {
      customer.box = orm.box
        ? BoxMapper.toDomain(orm.box, { relations: false })
        : null;
      customer.dropCables =
        orm.dropCables?.map((dropCable) =>
          DropCableMapper.toDomain(dropCable, { relations: false }),
        ) ?? [];
    }

    return customer;
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
