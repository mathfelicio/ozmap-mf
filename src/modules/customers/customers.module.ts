import { Module } from "@nestjs/common";
import { CUSTOMER_REPOSITORY } from "./domain/repositories/customer.repository";
import { CustomerTypeormRepository } from "./infrastructure/repositories/customer-typeorm.repository";

@Module({
  providers: [
    CustomerTypeormRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerTypeormRepository,
    },
  ],
  exports: [CUSTOMER_REPOSITORY, CustomerTypeormRepository],
})
export class CustomersModule {}
