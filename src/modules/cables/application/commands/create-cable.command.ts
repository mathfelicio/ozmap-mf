import type { CablePathPoint } from "../../domain/types/cable.props";

export interface CreateCableCommandPayload {
  name: string;
  capacity: number;
  boxesConnected: number[];
  path: CablePathPoint[];
}

export class CreateCableCommand {
  constructor(public readonly payload: CreateCableCommandPayload) {}
}
