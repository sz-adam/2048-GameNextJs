import { Tile, TileMap } from "@/models/tile";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { renderHook, act } from "@testing-library/react";
import { isNil } from "lodash";
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
        useReducer(gameReducer, initialState),
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

  //move up teszt
  describe("move_up", () => {
    it("should move tiles to the tip of the board", () => {
      // Két csempe létrehozása különböző pozíciókban.
      const tile1: Tile = {
        position: [0, 1],
        value: 2,
      };
      const tile2: Tile = {
        position: [1, 3],
        value: 2,
      };

      // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState),
      );

      // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
      const [, dispatch] = result.current;

      // "create_tile" típusú akció végrehajtása az állapot módosítására.
      act(() => {
        dispatch({ type: "create_tile", tile: tile1 });
        dispatch({ type: "create_tile", tile: tile2 });
      });

      // Az állapot frissítése a "result" objektum segítségével.
      const [stateBefore] = result.current;
      // ellenörzés hogy a pozició üres-e
      expect(isNil(stateBefore.board[0][0])).toBeTruthy();
      expect(isNil(stateBefore.board[0][1])).toBeTruthy();
      //ellenörzés hogy a pozicióban van-e csempe
      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      // "move_up" típusú akció végrehajtása az állapot módosítására.
      act(() => dispatch({ type: "move_up" }));

      const [stateAfter] = result.current;
      // ellenörzés hogy a pozició üres-e
      expect(typeof stateAfter.board[0][0]).toBe("string");
      expect(typeof stateAfter.board[0][1]).toBe("string");
      //ellenörzés hogy a pozicióban van-e csempe
      expect(isNil(stateAfter.board[1][0])).toBeTruthy();
      expect(isNil(stateAfter.board[3][1])).toBeTruthy();
    });
  });

  //lefelé mozgatás tesztje
  describe("move_down", () => {
    it("should move tiles to the bottom of the board", () => {
      // Két csempe létrehozása különböző pozíciókban.
      const tile1: Tile = {
        position: [0, 1],
        value: 2,
      };
      const tile2: Tile = {
        position: [1, 3],
        value: 2,
      };

      // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState),
      );

      // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
      const [, dispatch] = result.current;

      // "create_tile" típusú akció végrehajtása az állapot módosítására.
      act(() => {
        dispatch({ type: "create_tile", tile: tile1 });
        dispatch({ type: "create_tile", tile: tile2 });
      });

      // Az állapot frissítése a "result" objektum segítségével.
      const [stateBefore] = result.current;
      //ellenörzés hogy a pozició üres-e
      expect(isNil(stateBefore.board[0][0])).toBeTruthy();
      //ellenörzés hogy a pozicióban van-e csempe
      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      act(() => dispatch({ type: "move_down" }));
      // Az állapot frissítése a "result" objektum segítségével.
      const [stateAfter] = result.current;
      //ellenörzés hogy a pozició üres-e

      expect(typeof stateAfter.board[3][0]).toBe("string");
      expect(typeof stateAfter.board[3][1]).toBe("string");
      //ellenörzés hogy a pozicióban van-e csempe

      expect(isNil(stateAfter.board[1][0])).toBeTruthy();
    });
  });

  //bal mozgás
  describe("move_left", () => {
    it("should move tiles to the left side of the board", () => {
      // Két csempe létrehozása különböző pozíciókban.
      const tile1: Tile = {
        position: [0, 1],
        value: 2,
      };
      const tile2: Tile = {
        position: [1, 3],
        value: 2,
      };

      // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState),
      );

      // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
      const [, dispatch] = result.current;

      // "create_tile" típusú akció végrehajtása az állapot módosítására.
      act(() => {
        dispatch({ type: "create_tile", tile: tile1 });
        dispatch({ type: "create_tile", tile: tile2 });
      });

      // Az állapot frissítése a "result" objektum segítségével.
      const [stateBefore] = result.current;
      // ellenörzés hogy a pozició üres-e
      expect(isNil(stateBefore.board[3][0])).toBeTruthy();
      //ellenörzés hogy a pozicióban van-e csempe
      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      // "move_up" típusú akció végrehajtása az állapot módosítására.
      act(() => dispatch({ type: "move_left" }));

      const [stateAfter] = result.current;
      // ellenörzés hogy a pozició üres-e
      expect(typeof stateAfter.board[1][0]).toBe("string");
      expect(typeof stateAfter.board[3][0]).toBe("string");
      //ellenörzés hogy a pozicióban van-e csempe
      expect(isNil(stateAfter.board[3][1])).toBeTruthy();
    });
  });

  //jobb oldalra mozgás
  describe("move_right", () => {
    it("should move tiles to the right side of the board", () => {
      // Két csempe létrehozása különböző pozíciókban.
      const tile1: Tile = {
        position: [0, 1],
        value: 2,
      };
      const tile2: Tile = {
        position: [1, 3],
        value: 2,
      };

      // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState),
      );

      // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
      const [, dispatch] = result.current;

      // "create_tile" típusú akció végrehajtása az állapot módosítására.
      act(() => {
        dispatch({ type: "create_tile", tile: tile1 });
        dispatch({ type: "create_tile", tile: tile2 });
      });

      // Az állapot frissítése a "result" objektum segítségével.
      const [stateBefore] = result.current;
      // ellenörzés hogy a pozició üres-e
      expect(isNil(stateBefore.board[1][3])).toBeTruthy();
      expect(isNil(stateBefore.board[3][3])).toBeTruthy();
      //ellenörzés hogy a pozicióban van-e csempe
      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      // "move_up" típusú akció végrehajtása az állapot módosítására.
      act(() => dispatch({ type: "move_right" }));

      const [stateAfter] = result.current;
      // ellenörzés hogy a pozició üres-e
      expect(typeof stateAfter.board[1][3]).toBe("string");
      expect(typeof stateAfter.board[3][3]).toBe("string");
      //ellenörzés hogy a pozicióban van-e csempe
      expect(isNil(stateAfter.board[1][0])).toBeTruthy();
      expect(isNil(stateAfter.board[3][1])).toBeTruthy();
    });
  });

  //azonos cellák egyesítése felfelé
  it("should stack tiles with the same value on top of each other", () => {
    // Két csempe létrehozása különböző pozíciókban.
    const tile1: Tile = {
      position: [0, 1],
      value: 2,
    };
    const tile2: Tile = {
      position: [0, 3],
      value: 2,
    };

    // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
    const { result } = renderHook(() => useReducer(gameReducer, initialState));

    // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
    const [, dispatch] = result.current;

    // "create_tile" típusú akció végrehajtása az állapot módosítására.
    act(() => {
      dispatch({ type: "create_tile", tile: tile1 });
      dispatch({ type: "create_tile", tile: tile2 });
    });

    // Az állapot frissítése a "result" objektum segítségével.
    const [stateBefore] = result.current;
    // ellenörzés hogy a pozició üres-e
    expect(isNil(stateBefore.board[0][0])).toBeTruthy();
    expect(typeof stateBefore.board[1][0]).toBe("string");
    expect(isNil(stateBefore.board[2][0])).toBeTruthy();
    expect(typeof stateBefore.board[3][0]).toBe("string");

    // "move_up" típusú akció végrehajtása az állapot módosítására.
    act(() => dispatch({ type: "move_up" }));

    const [stateAfter] = result.current;
    // ellenörzés hogy a pozició üres-e
    expect(typeof stateAfter.board[0][0]).toBe("string");
    //ellenörzés hogy a pozicióban van-e csempe
    expect(isNil(stateAfter.board[1][0])).toBeTruthy();
    expect(isNil(stateAfter.board[2][0])).toBeTruthy();
    expect(isNil(stateAfter.board[3][0])).toBeTruthy();
  });

  //azonos cellák lefelé léptetés egyesítése
  it("should stack tiles with the same value on top of each other", () => {
    // Két csempe létrehozása különböző pozíciókban.
    const tile1: Tile = {
      position: [0, 1],
      value: 2,
    };
    const tile2: Tile = {
      position: [0, 3],
      value: 2,
    };

    // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
    const { result } = renderHook(() => useReducer(gameReducer, initialState));

    // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
    const [, dispatch] = result.current;

    // "create_tile" típusú akció végrehajtása az állapot módosítására.
    act(() => {
      dispatch({ type: "create_tile", tile: tile1 });
      dispatch({ type: "create_tile", tile: tile2 });
    });

    // Az állapot frissítése a "result" objektum segítségével.
    const [stateBefore] = result.current;
    // ellenörzés hogy a pozició üres-e
    expect(isNil(stateBefore.board[0][0])).toBeTruthy();
    expect(typeof stateBefore.board[1][0]).toBe("string");
    expect(isNil(stateBefore.board[2][0])).toBeTruthy();
    expect(typeof stateBefore.board[3][0]).toBe("string");

    // "move_up" típusú akció végrehajtása az állapot módosítására.
    act(() => dispatch({ type: "move_down" }));

    const [stateAfter] = result.current;
    //ellenörzés hogy a pozicióban van-e csempe
    expect(isNil(stateAfter.board[0][0])).toBeTruthy();
    expect(isNil(stateAfter.board[1][0])).toBeTruthy();
    expect(isNil(stateAfter.board[2][0])).toBeTruthy();
    // ellenörzés hogy a pozició üres-e
    expect(typeof stateAfter.board[3][0]).toBe("string");
  });

  //azonos cellák balra léptetés egyesítése
  it("should stack tiles with the same value on top of each other", () => {
    // Két csempe létrehozása különböző pozíciókban.
    const tile1: Tile = {
      position: [0, 1],
      value: 2,
    };
    const tile2: Tile = {
      position: [3, 1],
      value: 2,
    };

    // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
    const { result } = renderHook(() => useReducer(gameReducer, initialState));

    // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
    const [, dispatch] = result.current;

    // "create_tile" típusú akció végrehajtása az állapot módosítására.
    act(() => {
      dispatch({ type: "create_tile", tile: tile1 });
      dispatch({ type: "create_tile", tile: tile2 });
    });

    // Az állapot frissítése a "result" objektum segítségével.
    const [stateBefore] = result.current;

    expect(typeof stateBefore.board[1][0]).toBe("string");
    expect(isNil(stateBefore.board[1][1])).toBeTruthy();
    expect(isNil(stateBefore.board[1][2])).toBeTruthy();
    expect(typeof stateBefore.board[1][3]).toBe("string");

    // "move_up" típusú akció végrehajtása az állapot módosítására.
    act(() => dispatch({ type: "move_left" }));

    const [stateAfter] = result.current;
    // ellenörzés hogy a pozició üres-e

    expect(typeof stateBefore.board[1][0]).toBe("string");
    //ellenörzés hogy a pozicióban van-e csempe
    expect(isNil(stateAfter.board[1][1])).toBeTruthy();
    expect(isNil(stateAfter.board[1][1])).toBeTruthy();
    expect(isNil(stateAfter.board[1][1])).toBeTruthy();
  });

  //azonos cellák egyesítése jobbra lépéssel
  it("should stack tiles with the same value on top of each other", () => {
    // Két csempe létrehozása különböző pozíciókban.
    const tile1: Tile = {
      position: [0, 1],
      value: 2,
    };
    const tile2: Tile = {
      position: [3, 1],
      value: 2,
    };

    // Teszthorgony létrehozása, a "gameReducer" és az "initialState" felhasználásával.
    const { result } = renderHook(() => useReducer(gameReducer, initialState));

    // A horgonyból a "dispatch" és az aktuális állapot kinyerése.
    const [, dispatch] = result.current;

    // "create_tile" típusú akció végrehajtása az állapot módosítására.
    act(() => {
      dispatch({ type: "create_tile", tile: tile1 });
      dispatch({ type: "create_tile", tile: tile2 });
    });

    // Az állapot frissítése a "result" objektum segítségével.
    const [stateBefore] = result.current;
    // ellenörzés hogy a pozició üres-e
    expect(typeof stateBefore.board[1][0]).toBe("string");
    expect(isNil(stateBefore.board[1][1])).toBeTruthy();
    expect(isNil(stateBefore.board[1][2])).toBeTruthy();
    expect(typeof stateBefore.board[1][3]).toBe("string");

    // "move_up" típusú akció végrehajtása az állapot módosítására.
    act(() => dispatch({ type: "move_right" }));

    const [stateAfter] = result.current;

    //ellenörzés hogy a pozicióban van-e csempe
    expect(isNil(stateAfter.board[1][0])).toBeTruthy();
    expect(isNil(stateAfter.board[1][1])).toBeTruthy();
    expect(isNil(stateAfter.board[1][2])).toBeTruthy();
    // ellenörzés hogy a pozició üres-e

    expect(typeof stateBefore.board[1][3]).toBe("string");
  });
});
