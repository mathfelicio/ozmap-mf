import type { Customer } from "../../../customers/domain/entities/customer.entity";
import type { DropCable } from "../../../drop-cables/domain/entities/drop-cable.entity";
import type { Cable } from "../../../cables/domain/entities/cable.entity";

export interface BoxProps {
  id: number | null;
  name: string;
  type: string;
  lat: number;
  lng: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  customers?: Customer[];
  dropCables?: DropCable[];
  cables?: Cable[];
}
