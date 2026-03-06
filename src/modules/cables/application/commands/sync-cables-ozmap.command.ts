import { Cable } from "../../domain/entities/cable.entity";

export class SyncCablesOzmapCommand {
  constructor(public readonly payload: Cable[]) {}
}
