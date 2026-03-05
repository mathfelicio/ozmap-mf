import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";

import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { Cable } from "../../domain/entities/cable.entity";
import { ICableRepository } from "../../domain/repositories/cable.repository";
import { CableOrmEntity } from "../entities/cable-orm.entity";
import { CableMapper } from "../mappers/cable.mapper";

@Injectable()
export class CableTypeormRepository implements ICableRepository {
  private readonly repository: Repository<CableOrmEntity>;

  constructor(private readonly manager: EntityManager) {
    this.repository = this.manager.getRepository(CableOrmEntity);
  }

  async findOne(
    criteria: FindCriteria<Cable>,
    options?: FindOptions<Cable>,
  ): Promise<Cable | null> {
    const orm = await this.repository.findOne({
      where: criteria as any,
      ...(options as any),
    });

    return orm ? CableMapper.toDomain(orm) : null;
  }

  async findAll(
    criteria?: FindCriteria<Cable>,
    options?: FindOptions<Cable>,
  ): Promise<Cable[]> {
    const orms = await this.repository.find({
      where: criteria as any,
      ...(options as any),
    });

    return orms.map(CableMapper.toDomain);
  }

  async create(cable: Cable): Promise<Cable> {
    const saved = await this.repository.save(CableMapper.toPersistence(cable));

    return CableMapper.toDomain(saved);
  }

  async update(cable: Cable): Promise<Cable> {
    const saved = await this.repository.save(CableMapper.toPersistence(cable));

    return CableMapper.toDomain(saved);
  }

  async delete(cable: Cable): Promise<void> {
    if (cable.id === null) {
      return;
    }

    await this.repository.softDelete(cable.id);
  }
}
