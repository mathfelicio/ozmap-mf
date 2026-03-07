import { Inject, Injectable } from "@nestjs/common";
import { Syncable } from "../../../../common/interfaces/syncable.interface";
import {
  IOzmSdkAuthService,
  OZM_SDK_AUTH_SERVICE,
} from "../../../ozm-sdk/domain/interfaces/ozm-sdk.service.interface";
import { Customer } from "../../domain/entities/customer.entity";
import { SyncCustomersOzmapMapper } from "../../infrastructure/mappers/sync-customers-ozmap.mapper";

@Injectable()
export class SyncCustomersOzmapUseCase implements Syncable<Customer> {
  private itemsToSync: Customer[] = [];
  private itemsToCreate: Customer[] = [];
  private itemsToUpdate: { local: Customer; remoteId: string }[] = [];

  constructor(
    @Inject(OZM_SDK_AUTH_SERVICE)
    private readonly ozmSdkAuthService: IOzmSdkAuthService,
  ) {}

  getHierarchy(): number {
    return 0;
  }

  async execute(payload: Customer[]): Promise<void> {
    this.itemsToSync = payload;
    await this.fetch();
    await this.sync();
  }

  async fetch(): Promise<Customer[]> {
    const sdk = this.ozmSdkAuthService.auth;
    this.itemsToCreate = [];
    this.itemsToUpdate = [];
    const remoteProperties = await sdk.property.findAll();

    await Promise.all(
      this.itemsToSync.map(async (customer) => {
        const externalId = customer.id?.toString();

        if (!externalId) {
          this.itemsToCreate.push(customer);
          return;
        }

        const remoteProperty = remoteProperties.find(
          (item) => String(item.external_id) === externalId,
        );

        if (remoteProperty) {
          this.itemsToUpdate.push({
            local: customer,
            remoteId: String(remoteProperty.id),
          });
        } else {
          this.itemsToCreate.push(customer);
        }
      }),
    );

    return this.itemsToSync;
  }

  async sync(): Promise<void> {
    const sdk = this.ozmSdkAuthService.auth;
    const projectId = process.env.OZMAP_PROJECT_ID ?? "mock";

    if (this.itemsToCreate.length > 0) {
      await Promise.all(
        this.itemsToCreate.map((customer) =>
          sdk.property.create(
            SyncCustomersOzmapMapper.toCreateDto(customer, { projectId }),
          ),
        ),
      );
    }

    if (this.itemsToUpdate.length > 0) {
      await Promise.all(
        this.itemsToUpdate.map(({ local, remoteId }) =>
          sdk.property.updateById(
            remoteId,
            SyncCustomersOzmapMapper.toUpdateDto(local),
          ),
        ),
      );
    }
  }
}
