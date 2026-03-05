import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Customer } from "../../domain/entities/customer.entity";
import { CreateCustomerUseCase } from "../use-cases/create-customer.use-case";
import { CreateCustomerCommand } from "./create-customer.command";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<
  CreateCustomerCommand,
  Customer
> {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    return this.createCustomerUseCase.execute(command.payload);
  }
}
