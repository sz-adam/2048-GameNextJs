import styles from "@/styles/board.module.css";
import { useCallback, useContext, useEffect, useRef } from "react";
import Tile from "./tile";
import { Tile as TileModel } from "@/models/tile";
import { GameContext } from "@/context/game-context";
import MobileSwiper, { SwipeInput } from "./mobile-swiper";

export default function Board() {
  const { getTiles, moveTiles, startGame } = useContext(GameContext);
  // A játékállapot (state) és az állapotkezelő (reducer) használata

  // Egy referencia a komponens inicializálásának követésére
  const initialized = useRef(false);

  // Billentyűlenyomás kezelő függvény
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.code) {
        case "ArrowUp":
          moveTiles("move_up"); // 'move_up'
          break;
        case "ArrowDown":
          moveTiles("move_down"); // 'move_down'
          break;
        case "ArrowLeft":
          moveTiles("move_left"); // 'move_left'
          break;
        case "ArrowRight":
          moveTiles("move_right"); // 'move_Right'
          break;
      }
    },
    [moveTiles],
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveTiles("move_right");
        } else {
          moveTiles("move_left");
        }
      } else {
        if (deltaY > 0) {
          moveTiles("move_down");
        } else {
          moveTiles("move_up");
        }
      }
    },
    [moveTiles],
  );

  const renderGrid = () => {
    //üres tömb ahová a cella elemek kerülnek
    const cells: JSX.Element[] = [];
    //mennyi cellát akarunk létrehozni
    const totalCellsCount = 16;

    //létrehoz a totalCellsCount álltal meghatározott számu divet , kulcsnek az indexet adja meg
    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(<div className={styles.cell} key={index} />);
    }
    return cells;
  };

  const renderTiles = () => {
    // Függvény a csempék renderelése
    return getTiles().map(
      // Az összes csempe értékének lekérése és azok leképezése JSX elemekké
      (tile: TileModel) => {
        // Minden csempére végrehajtja a következő függvényt
        return <Tile key={`${tile.id}`} {...tile} />; // Tile komponens renderelése egyedi kulccsal és az összes csempe tulajdonságával
      },
    );
  };

  useEffect(() => {
    // useEffect hook, amely az első renderelés után fut le
    if (initialized.current === false) {
      // Ellenőrzi, hogy a komponens már inicializálva van-e
      startGame();
      initialized.current = true; // Beállítja, hogy a komponens inicializálva van
    }
  }, [startGame]);

  //useEffect a billentyűzet lenyomásához
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <div className={styles.board}>
        <div className={styles.tiles}>{renderTiles()}</div>
        <div className={styles.grid}>{renderGrid()}</div>
      </div>
    </MobileSwiper>
  );
}
