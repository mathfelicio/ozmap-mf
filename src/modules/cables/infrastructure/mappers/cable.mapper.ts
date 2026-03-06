import { Cable } from "../../domain/entities/cable.entity";
import { BoxMapper } from "../../../boxes/infrastructure/mappers/box.mapper";
import { CableOrmEntity } from "../entities/cable-orm.entity";

interface MapOptions {
  relations?: boolean;
}

export class CableMapper {
  static toDomain(orm: CableOrmEntity, options: MapOptions = {}): Cable {
    const cable = Cable.rehydrate({
      id: orm.id,
      name: orm.name,
      capacity: orm.capacity,
      path: orm.path ?? [],
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt ?? null,
      deletedAt: orm.deletedAt ?? null,
    });

    if (options.relations !== false) {
      cable.boxes =
        orm.boxes?.map((box) =>
          BoxMapper.toDomain(box, { relations: false }),
        ) ?? [];
    }

    return cable;
  }

  static toPersistence(
    domain: Cable,
    options: MapOptions = {},
  ): CableOrmEntity {
    const orm = new CableOrmEntity();

    if (domain.id !== null) {
      orm.id = domain.id;
    }

    orm.name = domain.name;
    orm.capacity = domain.capacity;
    orm.path = domain.path;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt;

    if (options.relations !== false && domain.boxes) {
      orm.boxes = domain.boxes.map((box) =>
        BoxMapper.toPersistence(box, { relations: false }),
      );
    }

    return orm;
  }
}
