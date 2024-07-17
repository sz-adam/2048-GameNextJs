import { Tile } from "@/models/tile";
import { uid } from "uid";

// State típus definiálása: tartalmazza a board és tiles objektumokat
type State = { board: string[][]; tiles: { [id: string]: Tile } };

// Action típus definiálása: tartalmazza a type és tile objektumokat
type Action = { type: "create_tile"; tile: Tile };

// Függvény a játék tábla létrehozásához, alapértelmezett méret 4x4
function createBoard(tileCountDimension: number = 4): string[][] {
  const board: string[][] = []; // Üres board tömb inicializálása
  for (let i = 0; i < tileCountDimension; i += 1) { // Iteráció a táblaméret alapján
    board[i] = new Array(tileCountDimension).fill(undefined); // Minden sorban új tömb inicializálása undefined értékekkel
  }
  return board;
}

// Kezdeti állapot inicializálása: üres board és tiles
export const initialState: State = { board: createBoard(), tiles: {} };

// gameReducer függvény exportálása, ami kezeli az állapot változásokat
export default function gameReducer(
  state: State = initialState, // Alapértelmezett állapot az initialState
  action: Action // Akció objektum
) {
  switch (action.type) { // Az akció típusa alapján történő elágazás
    case "create_tile": { // Ha az akció típusa "create_tile"
      const tileId = uid(); // Egyedi azonosító generálása a csempének
      const [x, y] = action.tile.position; // Az x és y pozíciók kinyerése a csempe pozíciójából
      const newBoard = JSON.parse(JSON.stringify(state.board)); // Mély másolat készítése a jelenlegi tábláról
      newBoard[y][x] = tileId; // Az új csempe azonosítójának hozzáadása a megfelelő pozícióhoz a táblán

      return {
        ...state,
        board: newBoard,
        tiles: {
          ...state.tiles, // A jelenlegi csempe objektumok másolása
          [tileId]: action.tile, // Az új csempe hozzáadása az azonosítóval
        },
      };
    }
    default: 
      return state; 
  }
}
