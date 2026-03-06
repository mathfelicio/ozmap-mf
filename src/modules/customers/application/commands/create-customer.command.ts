export interface CreateCustomerCommandPayload {
  id?: number | null;
  code: string;
  name: string;
  address: string;
  box_id: number;
}

export class CreateCustomerCommand {
  constructor(public readonly payload: CreateCustomerCommandPayload[]) {}
}
