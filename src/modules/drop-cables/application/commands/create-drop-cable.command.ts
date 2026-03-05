export interface CreateDropCableCommandPayload {
  name: string;
  boxId: number;
  customerId: number;
}

export class CreateDropCableCommand {
  constructor(public readonly payload: CreateDropCableCommandPayload) {}
}
