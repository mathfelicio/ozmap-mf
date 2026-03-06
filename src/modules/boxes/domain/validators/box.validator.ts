import { DomainValidator } from "../../../../common/validators/domain/domain.validator";
import { Box } from "../entities/box.entity";

export class BoxValidator {
  static validate(entity: Box): void {
    this.validateName(entity.name);
    this.validateType(entity.type);
    this.validateLat(entity.lat);
    this.validateLng(entity.lng);
    this.validateCreatedAt(entity.createdAt);
    this.validateUpdatedAt(entity.updatedAt);
  }

  static validateUpdated(entity: Box): void {
    this.validateName(entity.name);
    this.validateType(entity.type);
    this.validateLat(entity.lat);
    this.validateLng(entity.lng);
    this.validateUpdatedAt(entity.updatedAt);
  }

  private static validateName(name: string): void {
    DomainValidator.required("name", name);
    DomainValidator.isString("name", name);
    DomainValidator.maxLength("name", name, 120);
  }

  private static validateType(type: string): void {
    DomainValidator.required("type", type);
    DomainValidator.isString("type", type);
    DomainValidator.maxLength("type", type, 40);
  }

  private static validateLat(lat: number): void {
    DomainValidator.required("lat", lat);
    DomainValidator.isNumber("lat", lat);
  }

  private static validateLng(lng: number): void {
    DomainValidator.required("lng", lng);
    DomainValidator.isNumber("lng", lng);
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
