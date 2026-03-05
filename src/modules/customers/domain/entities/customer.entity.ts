import type { CustomerProps } from "../types/customer.props";
import { CustomerValidator } from "../validators/customer.validator";

export class Customer {
  private constructor(
    public readonly id: number | null,
    public code: string,
    public name: string,
    public address: string,
    public boxId: number,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {
    CustomerValidator.validate(this);
  }

  static create(
    props: Omit<CustomerProps, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Customer {
    const now = new Date();

    return new Customer(
      null,
      props.code,
      props.name,
      props.address,
      props.boxId,
      now,
      null,
      null,
    );
  }

  static rehydrate(props: CustomerProps): Customer {
    return new Customer(
      props.id,
      props.code,
      props.name,
      props.address,
      props.boxId,
      props.createdAt,
      props.updatedAt ?? null,
      props.deletedAt ?? null,
    );
  }

  update(partial: Partial<Customer>): void {
    this.code = partial.code ?? this.code;
    this.name = partial.name ?? this.name;
    this.address = partial.address ?? this.address;
    this.boxId = partial.boxId ?? this.boxId;
    this.updatedAt = new Date();

    CustomerValidator.validateUpdated(this);
  }

  delete(): void {
    this.deletedAt = new Date();
  }
}

