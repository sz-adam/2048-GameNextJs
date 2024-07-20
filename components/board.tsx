import styles from "@/styles/board.module.css";
import { useEffect, useReducer, useRef } from "react";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import Tile from "./tile";
import { Tile as TileModel } from "@/models/tile";

export default function Board() {
  // A játékállapot (state) és az állapotkezelő (reducer) használata
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  // Egy referencia a komponens inicializálásának követésére
  const initialized = useRef(false);

  // Billentyűlenyomás kezelő függvény
  const handleKeydown = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.code) {
      case "ArrowUp":
        dispatch({ type: "move_up" }); // 'move_up'
        break;
      case "ArrowDown":
        dispatch({ type: "move_down" }); // 'move_down'
        break;
      case "ArrowLeft":
        dispatch({ type: "move_left" }); // 'move_left'
        break;
      case "ArrowRight":
        dispatch({ type: "move_right" }); // 'move_Right'
        break;
    }

    dispatch({ type:"clean_up"})
  };


  
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
    return Object.values(gameState.tiles).map(
      // Az összes csempe értékének lekérése és azok leképezése JSX elemekké
      (tile: TileModel, index: number) => {
        // Minden csempére végrehajtja a következő függvényt
        return <Tile key={`${index}`} {...tile} />; // Tile komponens renderelése egyedi kulccsal és az összes csempe tulajdonságával
      },
    );
  };

  useEffect(() => {
    // useEffect hook, amely az első renderelés után fut le
    if (initialized.current === false) {
      // Ellenőrzi, hogy a komponens már inicializálva van-e
      dispatch({ type: "create_tile", tile: { position: [0, 1], value: 2 } }); // Az első csempe létrehozása a pozíció [0, 1] és érték 2
      dispatch({ type: "create_tile", tile: { position: [0, 2], value: 2 } }); // A második csempe létrehozása a pozíció [0, 2] és érték 2

      initialized.current = true; // Beállítja, hogy a komponens inicializálva van
    }
  }, []);

  //useEffect a billentyűzet lenyomásához
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className={styles.board}>
      <div className={styles.tiles}>{renderTiles()}</div>
      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
