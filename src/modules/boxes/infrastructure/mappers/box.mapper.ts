import { Box } from "../../domain/entities/box.entity";
import { CableMapper } from "../../../cables/infrastructure/mappers/cable.mapper";
import { CustomerMapper } from "../../../customers/infrastructure/mappers/customer.mapper";
import { DropCableMapper } from "../../../drop-cables/infrastructure/mappers/drop-cable.mapper";
import { BoxOrmEntity } from "../entities/box-orm.entity";

interface MapOptions {
  relations?: boolean;
}

export class BoxMapper {
  static toDomain(orm: BoxOrmEntity, options: MapOptions = {}): Box {
    const box = Box.rehydrate({
      id: orm.id,
      name: orm.name,
      type: orm.type,
      lat: orm.lat,
      lng: orm.lng,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt ?? null,
      deletedAt: orm.deletedAt ?? null,
    });

    if (options.relations !== false) {
      box.customers =
        orm.customers?.map((customer) =>
          CustomerMapper.toDomain(customer, { relations: false }),
        ) ?? [];
      box.dropCables =
        orm.dropCables?.map((dropCable) =>
          DropCableMapper.toDomain(dropCable, { relations: false }),
        ) ?? [];
      box.cables =
        orm.cables?.map((cable) =>
          CableMapper.toDomain(cable, { relations: false }),
        ) ?? [];
    }

    return box;
  }

  static toPersistence(domain: Box): BoxOrmEntity {
    const orm = new BoxOrmEntity();

    if (domain.id !== null) {
      orm.id = domain.id;
    }

    orm.name = domain.name;
    orm.type = domain.type;
    orm.lat = domain.lat;
    orm.lng = domain.lng;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt;

    return orm;
  }
}
