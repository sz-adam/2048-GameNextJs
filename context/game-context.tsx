import { mergeAnimationDuration, tileCountPerDimension } from "@/constants";
import { Tile } from "@/models/tile";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { isNil, throttle } from "lodash";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
} from "react";

type MoveDirection = "move_up" | "move_down" | "move_left" | "move_right";

// GameContext létrehozása alapértelmezett értékekkel
export const GameContext = createContext({
  score: 0,
  getTiles: () => [] as Tile[], // Kezdeti játék állapot
  moveTiles: (_: MoveDirection) => {},
  startGame: () => {},
});

// GameProvider komponens exportálása, ami a játék logikát és állapotot kezeli
export default function GameProvider({ children }: PropsWithChildren) {
  // useReducer hook használata a gameReducer és initialState segítségével
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  // Üres cellák lekérő függvénye a játéktáblán
  const getEmptyCells = () => {
    const results: [number, number][] = []; // Eredmény tömb inicializálása

    // Iteráció a tábla minden celláján
    for (let x = 0; x < tileCountPerDimension; x++) {
      for (let y = 0; y < tileCountPerDimension; y++) {
        // Ha a cella üres (isNil true), hozzáadjuk az eredmény tömbhöz
        if (isNil(gameState.board[y][x])) {
          results.push([x, y]);
        }
      }
    }
    return results; // Üres cellák tömbjének visszaadása
  };

  // Véletlenszerű csempe hozzáadása a tábla üres cellájába
  const appendRandomTile = () => {
    const emptyCells = getEmptyCells(); // Üres cellák lekérdezése
    if (emptyCells.length > 0) {
      const cellIndex = Math.floor(Math.random() * emptyCells.length); // Véletlenszerű index kiválasztása
      const newTile = {
        position: emptyCells[cellIndex], // Csempe pozíciója
        value: 2, // Csempe értéke
      };
      dispatch({ type: "create_tile", tile: newTile }); // Akció dispatch-elése a reducer felé
    }
  };
  //csempe azonosítoi tömbben
  const getTiles = () => {
    return gameState.tilesByIds.map(
      (tileId: string) => gameState.tiles[tileId],
    );
  };

  const moveTiles = useCallback(
    throttle(
      (type: MoveDirection) => dispatch({ type }),
      mergeAnimationDuration * 1.05,
      { trailing: false },
    ),
    [dispatch],
  );

  const startGame = () => {
    dispatch({ type: "create_tile", tile: { position: [0, 1], value: 2 } }); // Az első csempe létrehozása a pozíció [0, 1] és érték 2
    dispatch({ type: "create_tile", tile: { position: [0, 2], value: 2 } }); // A második csempe létrehozása a pozíció [0, 2] és érték 2
  };

  useEffect(() => {
    if (gameState.hasChanged) {
      setTimeout(() => {
        dispatch({ type: "clean_up" }), appendRandomTile();
      }, mergeAnimationDuration);
    }
  }, [gameState.hasChanged]);

  // GameContext.Provider visszaadása a gyermek komponensekkel
  return (
    <GameContext.Provider
      value={{ score: gameState.score, getTiles, moveTiles, startGame }}
    >
      {children}
    </GameContext.Provider>
  );
}
