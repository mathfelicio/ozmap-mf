import { DomainValidator } from "../../../../common/validators/domain/domain.validator";
import { Customer } from "../entities/customer.entity";

export class CustomerValidator {
  static validate(entity: Customer): void {
    this.validateCode(entity.code);
    this.validateName(entity.name);
    this.validateAddress(entity.address);
    this.validateBoxId(entity.boxId);
    this.validateCreatedAt(entity.createdAt);
    this.validateUpdatedAt(entity.updatedAt);
  }

  static validateUpdated(entity: Customer): void {
    this.validateCode(entity.code);
    this.validateName(entity.name);
    this.validateAddress(entity.address);
    this.validateBoxId(entity.boxId);
    this.validateUpdatedAt(entity.updatedAt);
  }

  private static validateCode(code: string): void {
    DomainValidator.required("code", code);
    DomainValidator.isString("code", code);
    DomainValidator.maxLength("code", code, 32);
  }

  private static validateName(name: string): void {
    DomainValidator.required("name", name);
    DomainValidator.isString("name", name);
    DomainValidator.maxLength("name", name, 120);
  }

  private static validateAddress(address: string): void {
    DomainValidator.required("address", address);
    DomainValidator.isString("address", address);
    DomainValidator.maxLength("address", address, 255);
  }

  private static validateBoxId(boxId: number): void {
    DomainValidator.required("boxId", boxId);
    DomainValidator.isInt("boxId", boxId);
    DomainValidator.min("boxId", boxId, 1);
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

