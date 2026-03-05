export class DomainValidator {
  static required(field: string, value: unknown): void {
    if (value === null || value === undefined || value === "") {
      throw new Error(`${field} is required`);
    }
  }

  static optional(value: unknown, callback: () => void): void {
    if (value !== null && value !== undefined) {
      callback();
    }
  }

  static isString(field: string, value: unknown): void {
    if (typeof value !== "string") {
      throw new Error(`${field} must be a string`);
    }
  }

  static isNumber(field: string, value: unknown): void {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new Error(`${field} must be a valid number`);
    }
  }

  static isInt(field: string, value: unknown): void {
    this.isNumber(field, value);
    if (!Number.isInteger(value)) {
      throw new Error(`${field} must be an integer`);
    }
  }

  static min(field: string, value: number, minValue: number): void {
    if (value < minValue) {
      throw new Error(`${field} must be >= ${minValue}`);
    }
  }

  static maxLength(field: string, value: string, length: number): void {
    if (value.length > length) {
      throw new Error(`${field} must have at most ${length} characters`);
    }
  }

  static isArray(field: string, value: unknown): void {
    if (!Array.isArray(value)) {
      throw new Error(`${field} must be an array`);
    }
  }

  static isDateTime(field: string, value: string): void {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      throw new Error(`${field} must be a valid datetime`);
    }
  }
}
