import Board from "@/components/board";
import GameProvider from "@/context/game-context";
import { render } from "@testing-library/react";

describe("Board", () => {
  // Meghatároz egy tesztesetet, amely azt vizsgálja, hogy a Board 16 cellával renderelődik-e
  it("should render Board with 16 cells", () => {
    // Rendereli a Board komponenst, és kinyeri a DOM elemet tartalmazó container objektumot
    const { container } = render(
      <GameProvider>
        <Board />
      </GameProvider>,
    );
    // Kikeresi az összes olyan elemet a containerben, amelynek az osztályneve "cell"
    const cellElements = container.querySelectorAll(".cell");

    //Ellenőrzi hogy 16db jött-e létre
    expect(cellElements.length).toEqual(16);
  });

  it("should render Board with 2 tiles", () => {
    // Leírja a teszt nevét: "A tábla 2 csempével kell renderelődjön"
    const { container } = render(
      <GameProvider>
        <Board />
      </GameProvider>,
    );
    // Rendereli a Board komponenst és kinyeri a container elemet a renderelési eredményből
    const tiles = container.querySelectorAll(".tile"); // Kiválasztja az összes elemet a container-ből, amelyeknek az osztálya "tile"

    expect(tiles.length).toEqual(2); // Elvárás: az összes "tile" osztályú elem számának 2-nek kell lennie
  });
});
