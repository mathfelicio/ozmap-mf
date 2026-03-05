import { DropCable } from "../../domain/entities/drop-cable.entity";
import { DropCableOrmEntity } from "../entities/drop-cable-orm.entity";

export class DropCableMapper {
  static toDomain(orm: DropCableOrmEntity): DropCable {
    return DropCable.rehydrate({
      id: orm.id,
      name: orm.name,
      boxId: orm.boxId,
      customerId: orm.customerId,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt ?? null,
      deletedAt: orm.deletedAt ?? null,
    });
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

