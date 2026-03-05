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

  async execute(payload: CreateCustomerCommandPayload): Promise<Customer> {
    const customer = Customer.create(payload);

    return this.customerRepository.create(customer);
  }
}
