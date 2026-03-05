import type { CablePathPoint } from "../../domain/types/cable.props";

export interface CreateCableCommandPayload {
  id?: number | null;
  name: string;
  capacity: number;
  boxes_connected: number[];
  path: CablePathPoint[];
}

export class CreateCableCommand {
  constructor(public readonly payload: CreateCableCommandPayload[]) {}
}
