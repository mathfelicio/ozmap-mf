import { DomainValidator } from "../../../../common/validators/domain/domain.validator";
import type { CablePathPoint } from "../types/cable.props";
import { Cable } from "../entities/cable.entity";

export class CableValidator {
  static validate(entity: Cable): void {
    this.validateName(entity.name);
    this.validateCapacity(entity.capacity);
    this.validateBoxesConnected(entity.boxesConnected);
    this.validatePath(entity.path);
    this.validateCreatedAt(entity.createdAt);
    this.validateUpdatedAt(entity.updatedAt);
  }

  static validateUpdated(entity: Cable): void {
    this.validateName(entity.name);
    this.validateCapacity(entity.capacity);
    this.validateBoxesConnected(entity.boxesConnected);
    this.validatePath(entity.path);
    this.validateUpdatedAt(entity.updatedAt);
  }

  private static validateName(name: string): void {
    DomainValidator.required("name", name);
    DomainValidator.isString("name", name);
    DomainValidator.maxLength("name", name, 120);
  }

  private static validateCapacity(capacity: number): void {
    DomainValidator.required("capacity", capacity);
    DomainValidator.isInt("capacity", capacity);
    DomainValidator.min("capacity", capacity, 1);
  }

  private static validateBoxesConnected(boxesConnected: number[]): void {
    DomainValidator.required("boxesConnected", boxesConnected);
    DomainValidator.isArray("boxesConnected", boxesConnected);

    boxesConnected.forEach((boxId, index) => {
      DomainValidator.isInt(`boxesConnected[${index}]`, boxId);
      DomainValidator.min(`boxesConnected[${index}]`, boxId, 1);
    });
  }

  private static validatePath(path: CablePathPoint[]): void {
    DomainValidator.required("path", path);
    DomainValidator.isArray("path", path);

    path.forEach((point, index) => {
      DomainValidator.required(`path[${index}].lat`, point?.lat);
      DomainValidator.required(`path[${index}].lng`, point?.lng);
      DomainValidator.isNumber(`path[${index}].lat`, point.lat);
      DomainValidator.isNumber(`path[${index}].lng`, point.lng);
    });
  }

  private static validateCreatedAt(date: Date): void {
    DomainValidator.required("createdAt", date);
    DomainValidator.isDateTime("createdAt", date.toISOString());
  }

  private static validateUpdatedAt(date: Date | null): void {
    DomainValidator.optional(date, () =>
      DomainValidator.isDateTime("updatedAt", date!.toISOString()),
    );
  }
}

