import { DropCable } from "../../domain/entities/drop-cable.entity";

export class SyncDropCablesOzmapCommand {
  constructor(public readonly payload: DropCable[]) {}
}
