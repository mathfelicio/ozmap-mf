export interface IspCablePointResponse {
  lat: number;
  lng: number;
}

export interface IspCableResponse {
  id: number;
  name: string;
  capacity: number;
  boxes_connected: number[];
  path: IspCablePointResponse[];
}
