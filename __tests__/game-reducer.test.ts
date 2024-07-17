import { Tile } from "@/models/tile";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { renderHook, act } from "@testing-library/react";
import { useReducer } from "react";

// Tesztesetek leírása a "gameReducer"-hez.
describe("gameReducer", () => {
  // "create_tile" típusú akció tesztje.
  describe("create_tile", () => {
    it("should create a new tile", () => {
      // Új csempe létrehozása.
      const tile: Tile = {
        position: [0, 0],
        value: 2,
      };

      // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState)
      );

      // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
      const [, dispatch] = result.current;

      // "create_tile" típusú akció végrehajtása az állapot módosítására.
      act(() => dispatch({ type: "create_tile", tile }));

      // Az állapot frissítése a "result" objektum segítségével.
      const [state] = result.current;

      // Az elvárt eredmények ellenőrzése.
      expect(state.board[0][0]).toBeDefined(); // Az állapotban lévő táblának tartalmaznia kell az új csempét.
      expect(Object.values(state.tiles)).toEqual([tile]); // Az állapotban lévő csempéknek tartalmaznia kell az új csempét.
    });
  });
});
