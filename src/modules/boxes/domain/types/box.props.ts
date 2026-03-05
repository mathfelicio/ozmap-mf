export interface BoxProps {
  id: number | null;
  name: string;
  type: string;
  lat: number;
  lng: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
