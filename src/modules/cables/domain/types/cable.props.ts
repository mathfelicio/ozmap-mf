import type { Box } from "../../../boxes/domain/entities/box.entity";

export interface CablePathPoint {
  lat: number;
  lng: number;
}

export interface CableProps {
  id: number | null;
  name: string;
  capacity: number;
  path: CablePathPoint[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  boxes?: Box[];
}
