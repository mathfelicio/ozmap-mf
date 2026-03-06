import { Inject, Injectable } from "@nestjs/common";
import { Syncable } from "../../../../common/interfaces/syncable.interface";
import {
  IOzmSdkAuthService,
  OZM_SDK_AUTH_SERVICE,
} from "../../../ozm-sdk/domain/interfaces/ozm-sdk.service.interface";
import { Box } from "../../domain/entities/box.entity";
import { SyncBoxesOzmapMapper } from "../../infrastructure/mappers/sync-boxes-ozmap.mapper";

@Injectable()
export class SyncBoxesOzmapUseCase implements Syncable<Box> {
  private itemsToSync: Box[] = [];
  private itemsToCreate: Box[] = [];
  private itemsToUpdate: { local: Box; remoteId: string }[] = [];

  constructor(
    @Inject(OZM_SDK_AUTH_SERVICE)
    private readonly ozmSdkAuthService: IOzmSdkAuthService,
  ) {}

  getHierarcy(): number {
    const configuredLevel = Number(process.env.OZMAP_BOX_HIERARCHY_LEVEL ?? 1);
    return Number.isNaN(configuredLevel) ? 0 : configuredLevel;
  }

  async execute(payload: Box[]): Promise<void> {
    this.itemsToSync = payload;
    await this.fetch();

    await this.sync();
  }

  async fetch(): Promise<Box[]> {
    const sdk = this.ozmSdkAuthService.auth;
    this.itemsToCreate = [];
    this.itemsToUpdate = [];

    await Promise.all(
      this.itemsToSync.map(async (box) => {
        const externalId = box.id?.toString();

        if (!externalId) {
          this.itemsToCreate.push(box);
          return;
        }

        const existingBoxes = await sdk.box.findAll({
          filter: [
            {
              property: "external_id",
              operator: "=",
              value: externalId,
            },
          ],
        });

        const remoteBox = existingBoxes?.[0];

        if (remoteBox) {
          this.itemsToUpdate.push({
            local: box,
            remoteId: String(remoteBox.id),
          });
        } else {
          this.itemsToCreate.push(box);
        }
      }),
    );

    return this.itemsToSync;
  }

  async sync(): Promise<void> {
    const sdk = this.ozmSdkAuthService.auth;

    if (this.itemsToCreate.length > 0) {
      await Promise.all(
        this.itemsToCreate.map((box) =>
          sdk.box.create(
            SyncBoxesOzmapMapper.toCreateDto(box, {
              projectId: "mock",
              hierarchyLevel: this.getHierarcy(),
            }),
          ),
        ),
      );
    }

    if (this.itemsToUpdate.length > 0) {
      await Promise.all(
        this.itemsToUpdate.map(({ local, remoteId }) =>
          sdk.box.updateById(remoteId, SyncBoxesOzmapMapper.toUpdateDto(local)),
        ),
      );
    }
  }
}
