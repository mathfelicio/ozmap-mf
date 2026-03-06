import { DomainValidator } from "../../../../common/validators/domain/domain.validator";
import { DropCable } from "../entities/drop-cable.entity";

export class DropCableValidator {
  static validate(entity: DropCable): void {
    this.validateName(entity.name);
    this.validateBoxId(entity.boxId);
    this.validateCustomerId(entity.customerId);
    this.validateCreatedAt(entity.createdAt);
    this.validateUpdatedAt(entity.updatedAt);
  }

  static validateUpdated(entity: DropCable): void {
    this.validateName(entity.name);
    this.validateBoxId(entity.boxId);
    this.validateCustomerId(entity.customerId);
    this.validateUpdatedAt(entity.updatedAt);
  }

  private static validateName(name: string): void {
    DomainValidator.required("name", name);
    DomainValidator.isString("name", name);
    DomainValidator.maxLength("name", name, 120);
  }

  private static validateBoxId(boxId: number): void {
    DomainValidator.required("boxId", boxId);
    DomainValidator.isInt("boxId", boxId);
    DomainValidator.min("boxId", boxId, 1);
  }

  private static validateCustomerId(customerId: number): void {
    DomainValidator.required("customerId", customerId);
    DomainValidator.isInt("customerId", customerId);
    DomainValidator.min("customerId", customerId, 1);
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
