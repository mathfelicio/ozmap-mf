import { Box } from "../../domain/entities/box.entity";
import { SyncOptions } from "../types/sync-boxes-ozmap.types";

export class SyncBoxesOzmapCommand {
  constructor(
    public readonly payload: Box[],
    public readonly options?: SyncOptions,
  ) {}
}
