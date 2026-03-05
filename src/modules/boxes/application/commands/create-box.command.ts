export interface CreateBoxCommandPayload {
  id?: number | null;
  name: string;
  type: string;
  lat: number;
  lng: number;
}

export class CreateBoxCommand {
  constructor(public readonly payload: CreateBoxCommandPayload[]) {}
}
