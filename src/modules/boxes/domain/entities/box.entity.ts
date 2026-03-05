import type { Customer } from "../../../customers/domain/entities/customer.entity";
import type { DropCable } from "../../../drop-cables/domain/entities/drop-cable.entity";
import type { Cable } from "../../../cables/domain/entities/cable.entity";
import type { BoxProps } from "../types/box.props";
import { BoxValidator } from "../validators/box.validator";

export class Box {
  public customers?: Customer[];
  public dropCables?: DropCable[];
  public cables?: Cable[];

  private constructor(
    public readonly id: number | null,
    public name: string,
    public type: string,
    public lat: number,
    public lng: number,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    customers: Customer[] = [],
    dropCables: DropCable[] = [],
    cables: Cable[] = [],
  ) {
    this.customers = customers;
    this.dropCables = dropCables;
    this.cables = cables;
    BoxValidator.validate(this);
  }

  static create(
    props: Omit<BoxProps, "id" | "createdAt" | "updatedAt" | "deletedAt"> & {
      id?: number | null;
    },
  ): Box {
    const now = new Date();

    return new Box(
      props.id ?? null,
      props.name,
      props.type,
      props.lat,
      props.lng,
      now,
      null,
      null,
      props.customers ?? [],
      props.dropCables ?? [],
      props.cables ?? [],
    );
  }

  static rehydrate(props: BoxProps): Box {
    return new Box(
      props.id,
      props.name,
      props.type,
      props.lat,
      props.lng,
      props.createdAt,
      props.updatedAt ?? null,
      props.deletedAt ?? null,
      props.customers ?? [],
      props.dropCables ?? [],
      props.cables ?? [],
    );
  }

  update(partial: Partial<Box>): void {
    this.name = partial.name ?? this.name;
    this.type = partial.type ?? this.type;
    this.lat = partial.lat ?? this.lat;
    this.lng = partial.lng ?? this.lng;
    this.updatedAt = new Date();

    BoxValidator.validateUpdated(this);
  }

  delete(): void {
    this.deletedAt = new Date();
  }
}
