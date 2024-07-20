import { renderHook } from "@testing-library/react";
import usePreviousProps from "@/hooks/use-previous-props";

describe("usePreviousProps", () => {
  // Első teszt: Az első rendereléskor undefined-et kell visszaadnia
  it("should return undefined for the first render", () => {
    const { result } = renderHook(() => usePreviousProps("initial value"));
    // Elvárjuk, hogy az első rendereléskor undefined értéket adjon vissza

    expect(result.current).toBeUndefined();
  });

  // Második teszt: Az előző értéket kell visszaadnia a prop új értékre történő módosítása után
  it("should return the previous value of the prop", () => {
    // renderHook segítségével meghívjuk a hookot "initial value" kezdő értékkel

    const { result, rerender } = renderHook(
      ({ value }) => usePreviousProps(value),
      { initialProps: { value: "initial value" } },
    );

    rerender({ value: "updated value" });

    expect(result.current).toEqual("initial value"); // Kezdeti érték beállítása
  });
});
