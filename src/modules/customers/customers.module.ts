import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateCustomerHandler } from "./application/commands/create-customer.handler";
import { CreateCustomerUseCase } from "./application/use-cases/create-customer.use-case";
import { CUSTOMER_REPOSITORY } from "./domain/repositories/customer.repository";
import { CustomerTypeormRepository } from "./infrastructure/repositories/customer-typeorm.repository";

@Module({
  imports: [CqrsModule],
  providers: [
    CreateCustomerHandler,
    CreateCustomerUseCase,
    CustomerTypeormRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerTypeormRepository,
    },
  ],
  exports: [CUSTOMER_REPOSITORY, CustomerTypeormRepository],
})
export class CustomersModule {}
