import { Inject, Injectable } from "@nestjs/common";
import { Syncable } from "../../../../common/interfaces/syncable.interface";
import {
  IOzmSdkAuthService,
  OZM_SDK_AUTH_SERVICE,
} from "../../../ozm-sdk/domain/interfaces/ozm-sdk.service.interface";
import { Cable } from "../../domain/entities/cable.entity";
import { SyncCablesOzmapMapper } from "../../infrastructure/mappers/sync-cables-ozmap.mapper";

@Injectable()
export class SyncCablesOzmapUseCase implements Syncable<Cable> {
  private itemsToSync: Cable[] = [];
  private itemsToCreate: Cable[] = [];
  private itemsToUpdate: { local: Cable; remoteId: string }[] = [];

  constructor(
    @Inject(OZM_SDK_AUTH_SERVICE)
    private readonly ozmSdkAuthService: IOzmSdkAuthService,
  ) {}

  getHierarchy(): number {
    const configuredLevel = Number(
      process.env.OZMAP_CABLE_HIERARCHY_LEVEL ?? 1,
    );
    return Number.isNaN(configuredLevel) ? 0 : configuredLevel;
  }

  async execute(payload: Cable[]): Promise<void> {
    this.itemsToSync = payload;
    await this.fetch();
    await this.sync();
  }

  async fetch(): Promise<Cable[]> {
    const sdk = this.ozmSdkAuthService.auth;
    this.itemsToCreate = [];
    this.itemsToUpdate = [];
    const remoteCables = await sdk.cable.findAll();

    await Promise.all(
      this.itemsToSync.map(async (cable) => {
        const externalId = cable.id;

        if (!externalId) {
          this.itemsToCreate.push(cable);
          return;
        }

        const remoteCable = remoteCables.find(
          (item) => String(item.external_id) === String(externalId),
        );

        if (remoteCable) {
          this.itemsToUpdate.push({
            local: cable,
            remoteId: String(remoteCable.id),
          });
        } else {
          this.itemsToCreate.push(cable);
        }
      }),
    );

    return this.itemsToSync;
  }

  async sync(): Promise<void> {
    const sdk = this.ozmSdkAuthService.auth;
    const projectId = process.env.OZMAP_PROJECT_ID ?? "mock";
    const cableType = process.env.OZMAP_CABLE_TYPE_ID ?? "mock";
    const hierarchyLevel = this.getHierarchy();

    if (this.itemsToCreate.length > 0) {
      await Promise.all(
        this.itemsToCreate.map((cable) =>
          sdk.cable.create(
            SyncCablesOzmapMapper.toCreateDto(cable, {
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
            SyncCablesOzmapMapper.toUpdateDto(local),
          ),
        ),
      );
    }
  }
}
