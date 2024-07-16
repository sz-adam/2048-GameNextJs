import Board from "@/components/board";
import { render } from "@testing-library/react";

describe("Board", () => {
    // Meghatároz egy tesztesetet, amely azt vizsgálja, hogy a Board 16 cellával renderelődik-e
  it("should render Board with 16 cells", () => {
    // Rendereli a Board komponenst, és kinyeri a DOM elemet tartalmazó container objektumot
    const { container } = render(<Board />);
    // Kikeresi az összes olyan elemet a containerben, amelynek az osztályneve "cell"
    const cellElements = container.querySelectorAll(".cell");

    //Ellenőrzi hogy 16db jött-e létre
    expect(cellElements.length).toEqual(16);
  });
});
