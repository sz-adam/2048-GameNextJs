import { tileCountPerDimension } from "@/constants";
import { Tile, TileMap } from "@/models/tile";
import { uid } from "uid";
import { flattenDeep, isNil, result, values } from "lodash";

// State típus definiálása: tartalmazza a board és tiles objektumokat, tileyByIds ami elsönek üres tömb
type State = { board: string[][]; tiles: TileMap; tilesByIds: string[] };

// Action típus definiálása: tartalmazza a type és tile objektumokat
type Action =
  | { type: "create_tile"; tile: Tile }
  | { type: "move_up" }
  | { type: "move_down" }
  | { type: "move_left" }
  | { type: "move_right" }
  | { type: "clean_up" };

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
export const initialState: State = {
  board: createBoard(),
  tiles: {},
  tilesByIds: [],
};

// gameReducer függvény exportálása, ami kezeli az állapot változásokat
export default function gameReducer(
  state: State = initialState, // Alapértelmezett állapot az initialState
  action: Action, // Akció objektum
) {
  switch (
    action.type // Az akció típusa alapján történő elágazás
  ) {
    case "clean_up": {
      const flattenBoard = flattenDeep(state.board);
      const newTiles: TileMap = flattenBoard.reduce(
        (result, tileId: string) => {
          if (isNil(tileId)) {
            return result;
          }
          return {
            ...result,
            [tileId]: state.tiles[tileId],
          };
        },
        {},
      );

      return {
        ...state,
        tiles: newTiles,
        tilesByIds: Object.keys(newTiles),
      };
    }
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
          [tileId]: { id: tileId, ...action.tile }, // Az új csempe hozzáadása az azonosítóval
        },
        tilesByIds: [...state.tilesByIds, tileId],
      };
    }
    //mozgatás felfelé
    case "move_up": {
      const newBoard = createBoard(); //üres tábla
      const newTiles: TileMap = {}; //csempe térkép inicializálása

      for (let x = 0; x < tileCountPerDimension; x++) {
        let newY = 0; //új kordináták lekérése

        let previusTile: Tile | undefined;

        for (let y = 0; y < tileCountPerDimension; y++) {
          // Az aktuális csempe azonosítójának lekérése
          const tileId = state.board[y][x];
          //tileId változoba mentése
          const currentTile = state.tiles[tileId];
          //ha létezik a csempe
          if (!isNil(tileId)) {
            if (previusTile?.value === currentTile.value) {
              newTiles[previusTile.id as string] = {
                ...previusTile,
                value: previusTile.value * 2,
              };

              //létrehoz egy új csempét a currenTile alapján és egyel fentebb mozgatja
              newTiles[tileId] = {
                ...currentTile,
                position: [x, newY - 1],
              };
              previusTile = undefined;
              continue;
            }

            //új táblára helyezzük
            newBoard[newY][x] = tileId;
            //aktuális csempe másolása
            newTiles[tileId] = {
              ...currentTile,
              //új pozició beállítása
              position: [x, newY],
            };
            previusTile = newTiles[tileId];
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
        let previusTile: Tile | undefined;
        for (let y = tileCountPerDimension - 1; y >= 0; y--) {
          // Az aktuális csempe azonosítójának lekérése
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];
          //ha létezik a csempe
          if (!isNil(tileId)) {
            if (previusTile?.value === currentTile.value) {
              newTiles[previusTile.id as string] = {
                ...previusTile,
                value: previusTile.value * 2,
              };
              newTiles[tileId] = {
                ...currentTile,
                position: [x, newY + 1],
              };
              previusTile = undefined;
              continue;
            }
            // Az új táblára helyezés
            newBoard[newY][x] = tileId;
            //aktuális csempe másolása
            newTiles[tileId] = {
              ...currentTile,
              position: [x, newY], //új pozició beállítása
            };
            previusTile = newTiles[tileId];
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
    //bal mozgás
    case "move_left": {
      const newBoard = createBoard(); //üres tábla
      const newTiles: TileMap = {}; //csempe térkép inicializálása

      for (let y = 0; y < tileCountPerDimension; y++) {
        let newX = 0; //új kordináták lekérése
        let previusTile: Tile | undefined;
        for (let x = 0; x < tileCountPerDimension; x++) {
          // Az aktuális csempe azonosítójának lekérése
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];
          //ha létezik a csempe
          if (!isNil(tileId)) {
            if (previusTile?.value === currentTile.value) {
              newTiles[previusTile.id as string] = {
                ...currentTile,
                value: previusTile.value * 2,
              };
              newTiles[tileId] = {
                ...currentTile,
                position: [newX - 1, y],
              };
              previusTile = undefined;
              continue;
            }
            //új táblára helyezzük
            newBoard[y][newX] = tileId;
            //aktuális csempe másolása
            newTiles[tileId] = {
              ...currentTile,
              //új pozició beállítása
              position: [newX, y],
            };
            previusTile = newTiles[tileId];
            newX++; //kordináta növelése
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
      };
    }

    //jobb oldalra mozgás
    case "move_right": {
      const newBoard = createBoard(); //üres tábla
      const newTiles: TileMap = {}; //csempe térkép inicializálása

      for (let y = 0; y < tileCountPerDimension; y++) {
        let newX = tileCountPerDimension - 1; //új kordináták lekérése
        let previusTile: Tile | undefined;

        for (let x = tileCountPerDimension - 1; x >= 0; x--) {
          // Az aktuális csempe azonosítójának lekérése
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];
          //ha létezik a csempe
          if (!isNil(tileId)) {
            if (previusTile?.value === currentTile.value) {
              newTiles[previusTile.id as string] = {
                ...currentTile,
                value: previusTile.value * 2,
              };
              newTiles[tileId] = {
                ...currentTile,
                position: [newX + 1, y],
              };
              previusTile = undefined;
              continue;
            }
            //új táblára helyezzük
            newBoard[y][newX] = tileId;
            //aktuális csempe másolása
            newTiles[tileId] = {
              ...currentTile,
              //új pozició beállítása
              position: [newX, y],
            };
            previusTile = newTiles[tileId];
            newX--; //kordináta növelése
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
