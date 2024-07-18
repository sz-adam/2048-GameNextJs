export type Tile = {
  id?: string;
  position: [number, number];
  value: number;
};
//objektumtipus
export type TileMap = { [id: string]: Tile };
