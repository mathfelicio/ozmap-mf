import { Inject, Injectable } from "@nestjs/common";
import { DropCable } from "../../domain/entities/drop-cable.entity";
import {
  DROP_CABLE_REPOSITORY,
  IDropCableRepository,
} from "../../domain/repositories/drop-cable.repository";
import { CreateDropCableCommandPayload } from "../commands/create-drop-cable.command";

@Injectable()
export class CreateDropCableUseCase {
  constructor(
    @Inject(DROP_CABLE_REPOSITORY)
    private readonly dropCableRepository: IDropCableRepository,
  ) {}

  async execute(
    payload: CreateDropCableCommandPayload[],
  ): Promise<DropCable[]> {
    const dropCables = payload.map((dropCable) =>
      DropCable.create({
        id: dropCable.id,
        name: dropCable.name,
        boxId: dropCable.box_id,
        customerId: dropCable.customer_id,
      }),
    );

    return this.dropCableRepository.upsertMany(dropCables);
  }
}
