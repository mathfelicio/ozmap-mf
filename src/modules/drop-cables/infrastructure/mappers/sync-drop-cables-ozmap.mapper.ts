import type { UpdatePropertyDTO } from "@ozmap/ozmap-sdk";
import { DropCable } from "../../domain/entities/drop-cable.entity";

export class SyncDropCablesOzmapMapper {
  static toPropertyUpdateDto(
    dropCable: DropCable,
    ozmapBoxId: string,
  ): UpdatePropertyDTO {
    return {
      box: ozmapBoxId,
    };
  }

  static toCustomerExternalId(customerId: number): string {
    return customerId.toString();
  }
}
