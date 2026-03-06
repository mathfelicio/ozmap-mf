export interface CreateDropCableCommandPayload {
  id?: number | null;
  name: string;
  box_id: number;
  customer_id: number;
}

export class CreateDropCableCommand {
  constructor(public readonly payload: CreateDropCableCommandPayload[]) {}
}
