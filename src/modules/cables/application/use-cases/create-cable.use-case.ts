import { Inject, Injectable } from "@nestjs/common";
import { Cable } from "../../domain/entities/cable.entity";
import {
  CABLE_REPOSITORY,
  ICableRepository,
} from "../../domain/repositories/cable.repository";
import {
  BOX_REPOSITORY,
  IBoxRepository,
} from "../../../boxes/domain/repositories/box.repository";
import { CreateCableCommandPayload } from "../commands/create-cable.command";

@Injectable()
export class CreateCableUseCase {
  constructor(
    @Inject(CABLE_REPOSITORY)
    private readonly cableRepository: ICableRepository,
    @Inject(BOX_REPOSITORY)
    private readonly boxRepository: IBoxRepository,
  ) {}

  async execute(payload: CreateCableCommandPayload[]): Promise<Cable[]> {
    const uniqueBoxIds = Array.from(
      new Set(payload.flatMap((cable) => cable.boxes_connected)),
    );

    const boxesInDb = await this.boxRepository.findByIds(uniqueBoxIds);

    const boxesMap = new Map(boxesInDb.map((box) => [box.id, box]));

    const cables = payload.map((cablePayload) => {
      const specificBoxesForThisCable = cablePayload.boxes_connected
        .map((boxId) => boxesMap.get(boxId))
        .filter((box) => box !== undefined);

      return Cable.create({
        id: cablePayload.id,
        name: cablePayload.name,
        capacity: cablePayload.capacity,
        path: cablePayload.path,
        boxes: specificBoxesForThisCable,
      });
    });

    return this.cableRepository.upsertMany(cables);
  }
}
