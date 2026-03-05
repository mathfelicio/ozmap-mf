import { DropCable } from "../../domain/entities/drop-cable.entity";
import { BoxMapper } from "../../../boxes/infrastructure/mappers/box.mapper";
import { CustomerMapper } from "../../../customers/infrastructure/mappers/customer.mapper";
import { DropCableOrmEntity } from "../entities/drop-cable-orm.entity";

interface MapOptions {
  relations?: boolean;
}

export class DropCableMapper {
  static toDomain(
    orm: DropCableOrmEntity,
    options: MapOptions = {},
  ): DropCable {
    const dropCable = DropCable.rehydrate({
      id: orm.id,
      name: orm.name,
      boxId: orm.boxId,
      customerId: orm.customerId,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt ?? null,
      deletedAt: orm.deletedAt ?? null,
    });

    if (options.relations !== false) {
      dropCable.box = orm.box
        ? BoxMapper.toDomain(orm.box, { relations: false })
        : null;
      dropCable.customer = orm.customer
        ? CustomerMapper.toDomain(orm.customer, { relations: false })
        : null;
    }

    return dropCable;
  }

  static toPersistence(domain: DropCable): DropCableOrmEntity {
    const orm = new DropCableOrmEntity();

    if (domain.id !== null) {
      orm.id = domain.id;
    }

    orm.name = domain.name;
    orm.boxId = domain.boxId;
    orm.customerId = domain.customerId;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt;

    return orm;
  }
}
