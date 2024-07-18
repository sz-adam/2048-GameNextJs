import { tileCountPerDimension } from "@/constants";
import { Tile, TileMap } from "@/models/tile";
import { uid } from "uid";
import { isNil } from "lodash";

// State típus definiálása: tartalmazza a board és tiles objektumokat
type State = { board: string[][]; tiles: TileMap };

// Action típus definiálása: tartalmazza a type és tile objektumokat
type Action =
  | { type: "create_tile"; tile: Tile }
  | { type: "move_up" }
  | { type: "move_down" };

// Függvény a játék tábla létrehozásához, alapértelmezett méret 4x4
function createBoard() {
  const board: string[][] = []; // Üres board tömb inicializálása
  for (let i = 0; i < tileCountPerDimension; i += 1) {
    // Iteráció a táblaméret alapján
    board[i] = new Array(tileCountPerDimension).fill(undefined); // Minden sorban új tömb inicializálása undefined értékekkel
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
  switch (
    action.type // Az akció típusa alapján történő elágazás
  ) {
    case "create_tile": {
      // Ha az akció típusa "create_tile"
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
    //mozgatás felfelé
    case "move_up": {
      const newBoard = createBoard(); //üres tábla 
      const newTiles: TileMap = {}; //csempe térkép inicializálása

      for (let x = 0; x < tileCountPerDimension; x++) {
        let newY = 0; //új kordináták lekérése
        for (let y = 0; y < tileCountPerDimension; y++) { 
          // Az aktuális csempe azonosítójának lekérése
          const tileId = state.board[y][x];
          //ha létezik a csempe
          if (!isNil(tileId)) {
            //új táblára helyezzük
            newBoard[newY][x] = tileId; 
            //aktuális csempe másolása
            newTiles[tileId] = {
              ...state.tiles[tileId],
              //új pozició beállítása
              position: [x, newY],
            };
            newY++; //kordináta növelése
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
      };
    }

    //mozgatás lefelé
    case "move_down": {
      const newBoard = createBoard(); //üres tábla 
      const newTiles: TileMap = {}; //csempe térkép inicializálása

      for (let x = 0; x < tileCountPerDimension; x++) {
        let newY = tileCountPerDimension - 1; //új y kordináták lekérése
        for (let y = 0; y < tileCountPerDimension; y++) {
           // Az aktuális csempe azonosítójának lekérése
          const tileId = state.board[y][x];
           //ha létezik a csempe
          if (!isNil(tileId)) {
            // Az új táblára helyezés
            newBoard[newY][x] = tileId;
            //aktuális csempe másolása
            newTiles[tileId] = {
              ...state.tiles[tileId],
              position: [x, newY],  //új pozició beállítása
            };
            newY--; //kordináta csökkentése
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
      };
    }
    default:
      return state;
  }
}
