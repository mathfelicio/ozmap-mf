import type { CreatePropertyDTO, UpdatePropertyDTO } from "@ozmap/ozmap-sdk";
import { Customer } from "../../domain/entities/customer.entity";

interface ToCreateDtoOptions {
  projectId: string;
}

export class SyncCustomersOzmapMapper {
  static toCreateDto(
    customer: Customer,
    options: ToCreateDtoOptions,
  ): CreatePropertyDTO {
    return {
      name: customer.name,
      address: customer.address,
      project: options.projectId,
      coords: [0, 0],
      observation: `code:${customer.code}`,
      external_id: customer.id,
    };
  }

  static toUpdateDto(customer: Customer): UpdatePropertyDTO {
    return {
      name: customer.name,
      address: customer.address,
      observation: `code:${customer.code}`,
      external_id: customer.id,
    };
  }
}
