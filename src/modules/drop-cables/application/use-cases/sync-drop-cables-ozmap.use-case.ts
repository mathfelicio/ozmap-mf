import { Inject, Injectable } from "@nestjs/common";
import { Syncable } from "../../../../common/interfaces/syncable.interface";
import {
  IOzmSdkAuthService,
  OZM_SDK_AUTH_SERVICE,
} from "../../../ozm-sdk/domain/interfaces/ozm-sdk.service.interface";
import { DropCable } from "../../domain/entities/drop-cable.entity";
import { SyncDropCablesOzmapMapper } from "../../infrastructure/mappers/sync-drop-cables-ozmap.mapper";

@Injectable()
export class SyncDropCablesOzmapUseCase implements Syncable<DropCable> {
  private itemsToSync: DropCable[] = [];
  private syncTasks: { propertyRemoteId: string; boxRemoteId: string }[] = [];

  constructor(
    @Inject(OZM_SDK_AUTH_SERVICE)
    private readonly ozmSdkAuthService: IOzmSdkAuthService,
  ) {}

  getHierarchy(): number {
    return 0;
  }

  async execute(payload: DropCable[]): Promise<void> {
    this.itemsToSync = payload;
    await this.fetch();
    await this.sync();
  }

  async fetch(): Promise<DropCable[]> {
    const sdk = this.ozmSdkAuthService.auth;
    this.syncTasks = [];

    // Busca todas as propriedades e caixas para fazer o de-para de IDs externos
    const [remoteProperties, remoteBoxes] = await Promise.all([
      sdk.property.findAll(),
      sdk.box.findAll(),
    ]);

    this.itemsToSync.forEach((dropCable) => {
      const customerExternalId = SyncDropCablesOzmapMapper.toCustomerExternalId(
        dropCable.customerId,
      );
      const boxExternalId = dropCable.boxId.toString();

      const remoteProperty = remoteProperties.find(
        (p) => String(p.external_id) === customerExternalId,
      );
      const remoteBox = remoteBoxes.find(
        (b) => String(b.external_id) === boxExternalId,
      );

      if (remoteProperty && remoteBox) {
        this.syncTasks.push({
          propertyRemoteId: String(remoteProperty.id),
          boxRemoteId: String(remoteBox.id),
        });
      }
    });

    return this.itemsToSync;
  }

  async sync(): Promise<void> {
    const sdk = this.ozmSdkAuthService.auth;

    if (this.syncTasks.length > 0) {
      await Promise.all(
        this.syncTasks.map((task) =>
          sdk.property.updateById(task.propertyRemoteId, {
            box: task.boxRemoteId,
          }),
        ),
      );
    }
  }
}
