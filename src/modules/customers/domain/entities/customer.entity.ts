import type { Box } from "../../../boxes/domain/entities/box.entity";
import type { DropCable } from "../../../drop-cables/domain/entities/drop-cable.entity";
import type { CustomerProps } from "../types/customer.props";
import { CustomerValidator } from "../validators/customer.validator";

export class Customer {
  public box?: Box | null;
  public dropCables?: DropCable[];

  private constructor(
    public readonly id: number | null,
    public code: string,
    public name: string,
    public address: string,
    public boxId: number,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    box: Box | null = null,
    dropCables: DropCable[] = [],
  ) {
    this.box = box;
    this.dropCables = dropCables;
    CustomerValidator.validate(this);
  }

  static create(
    props: Omit<
      CustomerProps,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    > & {
      id?: number | null;
    },
  ): Customer {
    const now = new Date();

    return new Customer(
      props.id ?? null,
      props.code,
      props.name,
      props.address,
      props.boxId,
      now,
      null,
      null,
      props.box ?? null,
      props.dropCables ?? [],
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
      props.box ?? null,
      props.dropCables ?? [],
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
