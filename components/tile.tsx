import {Tile as TileProps} from "@/models/tile"
import { containerWidht, tileCountPerDimension } from "@/constants";
import styles from "@/styles/tile.module.css";

function Tile({ position, value }: TileProps) {
    // Függvény a pozíció pixelértékre való átváltásához
  const positionPixels = (position: number) => {
    // Pozíció arányos átváltása pixelértékre
    return (position / tileCountPerDimension) * containerWidht;
  };
// CSS stílus objektum létrehozása a bal és felső pozíció meghatározásához
  const style = {
    left: positionPixels(position[0]), // Bal pozíció pixelben
    top: positionPixels(position[1]), // Felső pozíció pixelben
  };

  return (
    <div className={styles.tile} style={style}>
      {value}
    </div>
  );
}

export default Tile;