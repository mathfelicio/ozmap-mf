import type { Box } from "../../../boxes/domain/entities/box.entity";
import type { CablePathPoint, CableProps } from "../types/cable.props";
import { CableValidator } from "../validators/cable.validator";

export class Cable {
  public boxes?: Box[];

  private constructor(
    public readonly id: number | null,
    public name: string,
    public capacity: number,
    public boxesConnected: number[],
    public path: CablePathPoint[],
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    boxes: Box[] = [],
  ) {
    this.boxes = boxes;
    CableValidator.validate(this);
  }

  static create(
    props: Omit<CableProps, "id" | "createdAt" | "updatedAt" | "deletedAt"> & {
      id?: number | null;
    },
  ): Cable {
    const now = new Date();

    return new Cable(
      props.id ?? null,
      props.name,
      props.capacity,
      props.boxesConnected,
      props.path,
      now,
      null,
      null,
      props.boxes ?? [],
    );
  }

  static rehydrate(props: CableProps): Cable {
    return new Cable(
      props.id,
      props.name,
      props.capacity,
      props.boxesConnected,
      props.path,
      props.createdAt,
      props.updatedAt ?? null,
      props.deletedAt ?? null,
      props.boxes ?? [],
    );
  }

  update(partial: Partial<Cable>): void {
    this.name = partial.name ?? this.name;
    this.capacity = partial.capacity ?? this.capacity;
    this.boxesConnected = partial.boxesConnected ?? this.boxesConnected;
    this.path = partial.path ?? this.path;
    this.updatedAt = new Date();

    CableValidator.validateUpdated(this);
  }

  delete(): void {
    this.deletedAt = new Date();
  }
}
