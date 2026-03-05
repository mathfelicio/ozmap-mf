import type { Box } from "../../../boxes/domain/entities/box.entity";
import type { DropCable } from "../../../drop-cables/domain/entities/drop-cable.entity";

export interface CustomerProps {
  id: number | null;
  code: string;
  name: string;
  address: string;
  boxId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  box?: Box | null;
  dropCables?: DropCable[];
}
