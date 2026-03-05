import { Inject, Injectable } from "@nestjs/common";
import { Box } from "../../domain/entities/box.entity";
import {
  BOX_REPOSITORY,
  IBoxRepository,
} from "../../domain/repositories/box.repository";
import { CreateBoxCommandPayload } from "../commands/create-box.command";

@Injectable()
export class CreateBoxUseCase {
  constructor(
    @Inject(BOX_REPOSITORY)
    private readonly boxRepository: IBoxRepository,
  ) {}

  async execute(payload: CreateBoxCommandPayload[]): Promise<Box[]> {
    const boxes = payload.map((box) =>
      Box.create({
        id: box.id,
        name: box.name,
        type: box.type,
        lat: box.lat,
        lng: box.lng,
      }),
    );

    return this.boxRepository.upsertMany(boxes);
  }
}
