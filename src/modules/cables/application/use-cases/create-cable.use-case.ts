import { Inject, Injectable } from "@nestjs/common";
import { Cable } from "../../domain/entities/cable.entity";
import {
  CABLE_REPOSITORY,
  ICableRepository,
} from "../../domain/repositories/cable.repository";
import { CreateCableCommandPayload } from "../commands/create-cable.command";

@Injectable()
export class CreateCableUseCase {
  constructor(
    @Inject(CABLE_REPOSITORY)
    private readonly cableRepository: ICableRepository,
  ) {}

  async execute(payload: CreateCableCommandPayload): Promise<Cable> {
    const cable = Cable.create(payload);

    return this.cableRepository.create(cable);
  }
}
