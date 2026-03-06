import { CqrsModule } from "@nestjs/cqrs";
import { Module } from "@nestjs/common";
import { OzmSdkController } from "./presentation/controllers/ozm-sdk.controller";
import { OzmSdkAuthService } from "./infrastructure/services/ozm-sdk-auth.service";
import { OZM_SDK_AUTH_SERVICE } from "./domain/interfaces/ozm-sdk.service.interface";

@Module({
  imports: [CqrsModule],
  controllers: [OzmSdkController],
  providers: [
    OzmSdkAuthService,
    {
      provide: OZM_SDK_AUTH_SERVICE,
      useClass: OzmSdkAuthService,
    },
  ],
  exports: [OZM_SDK_AUTH_SERVICE],
})
export class OzmSdkModule {}
