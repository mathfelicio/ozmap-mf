import { Injectable } from "@nestjs/common";
import { EntityManager, In, Repository } from "typeorm";

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

    return orms.map((orm) => CableMapper.toDomain(orm));
  }

  async create(cable: Cable): Promise<Cable> {
    const saved = await this.repository.save(CableMapper.toPersistence(cable));

    return CableMapper.toDomain(saved);
  }

  async upsertMany(cables: Cable[]): Promise<Cable[]> {
    if (!cables.length) {
      return [];
    }

    // 1. Converte do domínio para a entidade do banco
    const persistenceCables = cables.map((cable) =>
      CableMapper.toPersistence(cable),
    );

    // Pegamos os IDs que vieram do front/domínio (filtrando nulos)
    const cableIds = persistenceCables
      .map((c) => c.id)
      .filter((id) => id !== null && id !== undefined);

    // 2. Upsert de Alta Performance na tabela 'cables' (INSERT ON DUPLICATE KEY UPDATE)
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(CableOrmEntity)
      .values(persistenceCables)
      .orUpdate(
        ["name", "capacity", "path", "updated_at", "deleted_at"],
        ["id"],
      )
      .execute();

    // 3. Gerenciamento seguro da tabela pivô (Boxes)
    // Busca como os cabos estão AGORA no banco para comparar
    const existingCablesWithBoxes =
      cableIds.length > 0
        ? await this.repository.find({
            where: { id: In(cableIds) },
            relations: ["boxes"],
          })
        : [];

    for (const cable of cables) {
      if (!cable.id) continue;

      // Extrai os IDs novos que vieram no payload (forçando String para evitar bugs de tipo)
      const newBoxIds =
        cable.boxes
          ?.map((box) => String(box.id))
          .filter((id) => id !== "null" && id !== "undefined") ?? [];

      // Encontra o cabo correspondente no banco (comparando como String)
      const existingCable = existingCablesWithBoxes.find(
        (c) => String(c.id) === String(cable.id),
      );

      // Extrai os IDs das caixas que já estavam no banco (forçando String)
      const existingBoxIds =
        existingCable?.boxes?.map((b) => String(b.id)) ?? [];

      // Calcula exatamente o que precisa ser adicionado e removido
      const toAdd = newBoxIds.filter((id) => !existingBoxIds.includes(id));
      const toRemove = existingBoxIds.filter((id) => !newBoxIds.includes(id));

      const relationBuilder = this.repository
        .createQueryBuilder()
        .relation(CableOrmEntity, "boxes")
        .of(cable.id);

      // Aplica as mudanças na tabela pivô sem disparar ER_DUP_ENTRY
      if (toAdd.length > 0) {
        await relationBuilder.add(toAdd);
      }
      if (toRemove.length > 0) {
        await relationBuilder.remove(toRemove);
      }
    }

    // 4. Busca o resultado final atualizado para retornar ao UseCase
    const finalSaved = await this.repository.find({
      where: { id: In(cableIds) },
      relations: ["boxes"],
    });

    // Retorna mapeado de volta para o Domínio
    return finalSaved.map((entity) => CableMapper.toDomain(entity));
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
