import type { DropCableProps } from "../types/drop-cable.props";
import { DropCableValidator } from "../validators/drop-cable.validator";

export class DropCable {
  private constructor(
    public readonly id: number | null,
    public name: string,
    public boxId: number,
    public customerId: number,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {
    DropCableValidator.validate(this);
  }

  static create(
    props: Omit<DropCableProps, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): DropCable {
    const now = new Date();

    return new DropCable(
      null,
      props.name,
      props.boxId,
      props.customerId,
      now,
      null,
      null,
    );
  }

  static rehydrate(props: DropCableProps): DropCable {
    return new DropCable(
      props.id,
      props.name,
      props.boxId,
      props.customerId,
      props.createdAt,
      props.updatedAt ?? null,
      props.deletedAt ?? null,
    );
  }

  update(partial: Partial<DropCable>): void {
    this.name = partial.name ?? this.name;
    this.boxId = partial.boxId ?? this.boxId;
    this.customerId = partial.customerId ?? this.customerId;
    this.updatedAt = new Date();

    DropCableValidator.validateUpdated(this);
  }

  delete(): void {
    this.deletedAt = new Date();
  }
}
