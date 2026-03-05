export interface CreateCustomerCommandPayload {
  code: string;
  name: string;
  address: string;
  boxId: number;
}

export class CreateCustomerCommand {
  constructor(public readonly payload: CreateCustomerCommandPayload) {}
}
