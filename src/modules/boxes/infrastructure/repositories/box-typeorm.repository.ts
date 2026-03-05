import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";

import type {
  FindCriteria,
  FindOptions,
} from "../../../../common/repositories/repository.types";
import { Box } from "../../domain/entities/box.entity";
import { IBoxRepository } from "../../domain/repositories/box.repository";
import { BoxOrmEntity } from "../entities/box-orm.entity";
import { BoxMapper } from "../mappers/box.mapper";

@Injectable()
export class BoxTypeormRepository implements IBoxRepository {
  private readonly repository: Repository<BoxOrmEntity>;

  constructor(private readonly manager: EntityManager) {
    this.repository = this.manager.getRepository(BoxOrmEntity);
  }

  async findOne(
    criteria: FindCriteria<Box>,
    options?: FindOptions<Box>,
  ): Promise<Box | null> {
    const orm = await this.repository.findOne({
      where: criteria as any,
      ...(options as any),
    });

    return orm ? BoxMapper.toDomain(orm) : null;
  }

  async findAll(
    criteria?: FindCriteria<Box>,
    options?: FindOptions<Box>,
  ): Promise<Box[]> {
    const orms = await this.repository.find({
      where: criteria as any,
      ...(options as any),
    });

    return orms.map(BoxMapper.toDomain);
  }

  async create(box: Box): Promise<Box> {
    const saved = await this.repository.save(BoxMapper.toPersistence(box));

    return BoxMapper.toDomain(saved);
  }

  async update(box: Box): Promise<Box> {
    const saved = await this.repository.save(BoxMapper.toPersistence(box));

    return BoxMapper.toDomain(saved);
  }

  async delete(box: Box): Promise<void> {
    if (box.id === null) {
      return;
    }

    await this.repository.softDelete(box.id);
  }
}

