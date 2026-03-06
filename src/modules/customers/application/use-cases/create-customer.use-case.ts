import { Inject, Injectable } from "@nestjs/common";
import { Customer } from "../../domain/entities/customer.entity";
import {
  CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "../../domain/repositories/customer.repository";
import { CreateCustomerCommandPayload } from "../commands/create-customer.command";

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(payload: CreateCustomerCommandPayload[]): Promise<Customer[]> {
    const customers = payload.map((customer) =>
      Customer.create({
        id: customer.id,
        code: customer.code,
        name: customer.name,
        address: customer.address,
        boxId: customer.box_id,
      }),
    );

    return this.customerRepository.upsertMany(customers);
  }
}
