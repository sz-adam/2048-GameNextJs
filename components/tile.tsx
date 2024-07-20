import { Tile as TileProps } from "@/models/tile";
import {
  containerWidht,
  mergeAnimationDuration,
  tileCountPerDimension,
} from "@/constants";
import styles from "@/styles/tile.module.css";
import { useEffect, useState } from "react";
import usePreviousProps from "@/hooks/use-previous-props";

function Tile({ position, value }: TileProps) {
  const [scale, setScale] = useState(1);
  const previousValue = usePreviousProps(value);
  const hasChanged = previousValue !== value;
  // Függvény a pozíció pixelértékre való átváltásához
  const positionPixels = (position: number) => {
    // Pozíció arányos átváltása pixelértékre
    return (position / tileCountPerDimension) * containerWidht;
  };

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => setScale(1), mergeAnimationDuration);
    }
  }, [hasChanged]);
  // CSS stílus objektum létrehozása a bal és felső pozíció meghatározásához
  const style = {
    left: positionPixels(position[0]), // Bal pozíció pixelben
    top: positionPixels(position[1]), // Felső pozíció pixelben
    transform: `scale(${scale}`,
    zIndex: value,
  };

  return (
    <div className={styles.tile} style={style}>
      {value}
    </div>
  );
}

export default Tile;
