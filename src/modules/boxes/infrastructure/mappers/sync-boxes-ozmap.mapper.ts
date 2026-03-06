import type { CreateBoxDTO, UpdateBoxDTO } from "@ozmap/ozmap-sdk";
import { Box } from "../../domain/entities/box.entity";

interface ToCreateDtoOptions {
  projectId: string;
  hierarchyLevel: number;
}

export class SyncBoxesOzmapMapper {
  static toCreateDto(box: Box, options: ToCreateDtoOptions): CreateBoxDTO {
    return {
      name: box.name,
      project: options.projectId,
      boxType: box.type,
      hierarchyLevel: options.hierarchyLevel,
      implanted: true,
      coords: [box.lng, box.lat],
      external_id: box.id,
    };
  }

  static toUpdateDto(box: Box): UpdateBoxDTO {
    return {
      name: box.name,
      coords: [box.lng, box.lat],
      boxType: box.type,
      external_id: box.id,
    };
  }
}
