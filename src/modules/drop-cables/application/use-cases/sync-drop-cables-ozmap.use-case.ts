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
  private itemsToCreate: DropCable[] = [];
  private itemsToUpdate: { local: DropCable; remoteId: string }[] = [];

  constructor(
    @Inject(OZM_SDK_AUTH_SERVICE)
    private readonly ozmSdkAuthService: IOzmSdkAuthService,
  ) {}

  getHierarchy(): number {
    const configuredLevel = Number(
      process.env.OZMAP_DROP_CABLE_HIERARCHY_LEVEL ?? 1,
    );
    return Number.isNaN(configuredLevel) ? 0 : configuredLevel;
  }

  async execute(payload: DropCable[]): Promise<void> {
    this.itemsToSync = payload;
    await this.fetch();
    await this.sync();
  }

  async fetch(): Promise<DropCable[]> {
    const sdk = this.ozmSdkAuthService.auth;
    this.itemsToCreate = [];
    this.itemsToUpdate = [];
    const remoteCables = await sdk.cable.findAll();

    await Promise.all(
      this.itemsToSync.map(async (dropCable) => {
        const externalId = SyncDropCablesOzmapMapper.toExternalId(dropCable.id);

        if (!externalId) {
          this.itemsToCreate.push(dropCable);
          return;
        }

        const remoteDropCable = remoteCables.find(
          (item) => String(item.external_id) === String(externalId),
        );

        if (remoteDropCable) {
          this.itemsToUpdate.push({
            local: dropCable,
            remoteId: String(remoteDropCable.id),
          });
        } else {
          this.itemsToCreate.push(dropCable);
        }
      }),
    );

    return this.itemsToSync;
  }

  async sync(): Promise<void> {
    const sdk = this.ozmSdkAuthService.auth;
    const projectId = process.env.OZMAP_PROJECT_ID ?? "mock";
    const cableType = process.env.OZMAP_DROP_CABLE_TYPE_ID ?? "mock";
    const hierarchyLevel = this.getHierarchy();

    if (this.itemsToCreate.length > 0) {
      await Promise.all(
        this.itemsToCreate.map((dropCable) =>
          sdk.cable.create(
            SyncDropCablesOzmapMapper.toCreateDto(dropCable, {
              projectId,
              cableType,
              hierarchyLevel,
            }),
          ),
        ),
      );
    }

    if (this.itemsToUpdate.length > 0) {
      await Promise.all(
        this.itemsToUpdate.map(({ local, remoteId }) =>
          sdk.cable.updateById(
            remoteId,
            SyncDropCablesOzmapMapper.toUpdateDto(local),
          ),
        ),
      );
    }
  }
}
