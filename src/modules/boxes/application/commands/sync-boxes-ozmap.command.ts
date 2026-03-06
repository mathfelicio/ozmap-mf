import { Box } from "../../domain/entities/box.entity";

export class SyncBoxesOzmapCommand {
  constructor(public readonly payload: Box[]) {}
}
