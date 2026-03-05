export interface CustomerProps {
  id: number | null;
  code: string;
  name: string;
  address: string;
  boxId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

