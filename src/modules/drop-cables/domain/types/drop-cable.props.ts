import type { Box } from "../../../boxes/domain/entities/box.entity";
import type { Customer } from "../../../customers/domain/entities/customer.entity";

export interface DropCableProps {
  id: number | null;
  name: string;
  boxId: number;
  customerId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  box?: Box | null;
  customer?: Customer | null;
}
