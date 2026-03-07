import { Customer } from "../../domain/entities/customer.entity";

export class SyncCustomersOzmapCommand {
  constructor(public readonly payload: Customer[]) {}
}
