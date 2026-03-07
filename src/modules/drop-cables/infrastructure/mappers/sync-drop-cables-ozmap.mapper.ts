import type { CreateCableDTO, UpdateCableDTO } from "@ozmap/ozmap-sdk";
import { DropCable } from "../../domain/entities/drop-cable.entity";

interface ToCreateDtoOptions {
  projectId: string;
  cableType: string;
  hierarchyLevel: number;
}

export class SyncDropCablesOzmapMapper {
  static toCreateDto(
    dropCable: DropCable,
    options: ToCreateDtoOptions,
  ): CreateCableDTO {
    return {
      name: dropCable.name,
      project: options.projectId,
      cableType: options.cableType,
      hierarchyLevel: options.hierarchyLevel,
      implanted: true,
      orientationA: "A",
      orientationB: "B",
      poles: [],
      external_id: this.toExternalId(dropCable.id),
    };
  }

  static toUpdateDto(dropCable: DropCable): UpdateCableDTO {
    return {
      name: dropCable.name,
      implanted: true,
      orientationA: "A",
      orientationB: "B",
      poles: [],
      external_id: this.toExternalId(dropCable.id),
    };
  }

  static toExternalId(dropCableId: number | null): string | null {
    if (dropCableId === null) {
      return null;
    }

    return `drop-cable-${dropCableId}`;
  }
}
