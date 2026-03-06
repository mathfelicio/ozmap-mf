import type { CreateCableDTO, UpdateCableDTO } from "@ozmap/ozmap-sdk";
import { Cable } from "../../domain/entities/cable.entity";

interface ToCreateDtoOptions {
  projectId: string;
  cableType: string;
  hierarchyLevel: number;
}

export class SyncCablesOzmapMapper {
  static toCreateDto(
    cable: Cable,
    options: ToCreateDtoOptions,
  ): CreateCableDTO {
    return {
      name: cable.name,
      project: options.projectId,
      cableType: options.cableType,
      hierarchyLevel: options.hierarchyLevel,
      implanted: true,
      orientationA: "A",
      orientationB: "B",
      poles: cable.path.map((point) => ({ lat: point.lat, lng: point.lng })),
      external_id: cable.id,
    };
  }

  static toUpdateDto(cable: Cable): UpdateCableDTO {
    return {
      name: cable.name,
      implanted: true,
      orientationA: "A",
      orientationB: "B",
      poles: cable.path.map((point) => ({ lat: point.lat, lng: point.lng })),
      external_id: cable.id,
    };
  }
}
