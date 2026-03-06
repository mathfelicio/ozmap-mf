import { Box } from "../../../boxes/domain/entities/box.entity";
import { Cable } from "../../../cables/domain/entities/cable.entity";
import { Customer } from "../../../customers/domain/entities/customer.entity";
import { DropCable } from "../../../drop-cables/domain/entities/drop-cable.entity";

export interface RunOzmapSyncCommandPayload {
  boxes: Box[];
  cables: Cable[];
  customers: Customer[];
  dropCables: DropCable[];
}

export class RunOzmapSyncCommand {
  constructor(public readonly payload: RunOzmapSyncCommandPayload) {}
}
