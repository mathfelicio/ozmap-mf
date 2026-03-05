import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";

import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { DropCable } from "../../domain/entities/drop-cable.entity";
import { IDropCableRepository } from "../../domain/repositories/drop-cable.repository";
import { DropCableOrmEntity } from "../entities/drop-cable-orm.entity";
import { DropCableMapper } from "../mappers/drop-cable.mapper";

@Injectable()
export class DropCableTypeormRepository implements IDropCableRepository {
  private readonly repository: Repository<DropCableOrmEntity>;

  constructor(private readonly manager: EntityManager) {
    this.repository = this.manager.getRepository(DropCableOrmEntity);
  }

  async findOne(
    criteria: FindCriteria<DropCable>,
    options?: FindOptions<DropCable>,
  ): Promise<DropCable | null> {
    const orm = await this.repository.findOne({
      where: criteria as any,
      ...(options as any),
    });

    return orm ? DropCableMapper.toDomain(orm) : null;
  }

  async findAll(
    criteria?: FindCriteria<DropCable>,
    options?: FindOptions<DropCable>,
  ): Promise<DropCable[]> {
    const orms = await this.repository.find({
      where: criteria as any,
      ...(options as any),
    });

    return orms.map(DropCableMapper.toDomain);
  }

  async create(dropCable: DropCable): Promise<DropCable> {
    const saved = await this.repository.save(
      DropCableMapper.toPersistence(dropCable),
    );

    return DropCableMapper.toDomain(saved);
  }

  async update(dropCable: DropCable): Promise<DropCable> {
    const saved = await this.repository.save(
      DropCableMapper.toPersistence(dropCable),
    );

    return DropCableMapper.toDomain(saved);
  }

  async delete(dropCable: DropCable): Promise<void> {
    if (dropCable.id === null) {
      return;
    }

    await this.repository.softDelete(dropCable.id);
  }
}

