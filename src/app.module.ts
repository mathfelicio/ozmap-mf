import { Module } from "@nestjs/common";
import { IspSyncModule } from "./modules/isp-sync/isp-sync.module";
import { OzmSdkModule } from "./modules/ozm-sdk/ozm-sdk.module";
import { CablesModule } from "./modules/cables/cables.module";
import { CustomersModule } from "./modules/customers/customers.module";
import { BoxesModule } from "./modules/boxes/boxes.module";
import { DropCablesModule } from "./modules/drop-cables/drop-cables.module";
import { CqrsModule } from "@nestjs/cqrs";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./database/config/mysql-orm.config";
import { mongoOrmConfig } from "./database/config/mongo-orm.config";
import { FailuresModule } from "./common/failures/failures.module";

@Module({
  imports: [
    CqrsModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
    }),
    TypeOrmModule.forRootAsync({
      name: "mongodb",
      useFactory: () => mongoOrmConfig,
    }),
    FailuresModule,
    IspSyncModule,
    OzmSdkModule,
    CablesModule,
    CustomersModule,
    BoxesModule,
    DropCablesModule,
  ],
})
export class AppModule {}
