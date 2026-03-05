import { Box } from "../../domain/entities/box.entity";
import { BoxOrmEntity } from "../entities/box-orm.entity";

export class BoxMapper {
  static toDomain(orm: BoxOrmEntity): Box {
    return Box.rehydrate({
      id: orm.id,
      name: orm.name,
      type: orm.type,
      lat: orm.lat,
      lng: orm.lng,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt ?? null,
      deletedAt: orm.deletedAt ?? null,
    });
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

