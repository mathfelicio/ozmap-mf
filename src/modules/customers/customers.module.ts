import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateCustomerHandler } from "./application/commands/create-customer.handler";
import { SyncCustomersOzmapHandler } from "./application/commands/sync-customers-ozmap.handler";
import { CreateCustomerUseCase } from "./application/use-cases/create-customer.use-case";
import { SyncCustomersOzmapUseCase } from "./application/use-cases/sync-customers-ozmap.use-case";
import { CUSTOMER_REPOSITORY } from "./domain/repositories/customer.repository";
import { CustomerTypeormRepository } from "./infrastructure/repositories/customer-typeorm.repository";
import { OzmSdkModule } from "../ozm-sdk/ozm-sdk.module";

@Module({
  imports: [CqrsModule, OzmSdkModule],
  providers: [
    CreateCustomerHandler,
    SyncCustomersOzmapHandler,
    CreateCustomerUseCase,
    SyncCustomersOzmapUseCase,
    CustomerTypeormRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerTypeormRepository,
    },
  ],
  exports: [CUSTOMER_REPOSITORY, CustomerTypeormRepository],
})
export class CustomersModule {}
