import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type SwipeInput = { deltaX: number; deltaY: number };

type MobileSwiperProps = PropsWithChildren<{
  onSwipe: (_: SwipeInput) => void;
}>;

export default function MobileSwiper({ children, onSwipe }: MobileSwiperProps) {
  // Referencia létrehozása a wrapper div elemhez
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Állapotok a kezdő X és Y koordináták tárolásához
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  // Callback függvény a touchstart esemény kezeléséhez
  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Ellenőrzés, hogy az esemény a wrapper elemben történt-e
    if (!wrapperRef.current?.contains(e.target as Node)) {
      return;
    }

    // Az alapértelmezett eseménykezelés megakadályozása
    e.preventDefault();

    // A kezdő X és Y koordináták beállítása az esemény első érintési pontjára
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  }, []);

  // Callback függvény a touchend esemény kezeléséhez
  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      // Ellenőrzés, hogy az esemény a wrapper elemben történt-e
      if (!wrapperRef.current?.contains(e.target as Node)) {
        return;
      }

      // Az alapértelmezett eseménykezelés megakadályozása
      e.preventDefault();

      // A végső X és Y koordináták lekérése az esemény utolsó érintési pontjából
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      // A deltaX és deltaY kiszámítása a kezdő és végső koordináták különbségéből
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      // Az onSwipe callback hívása a kiszámított delta értékekkel
      onSwipe({ deltaX, deltaY });

      // Az állapotok alaphelyzetbe állítása
      setStartX(0);
      setStartY(0);
    },
    [startX, startY, onSwipe],
  );

  // useEffect a touchstart és touchend események hozzáadásához és eltávolításához
  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    // Eseménykezelők eltávolítása a komponens unmount során
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  // A wrapper div visszaadása a gyerek elemekkel
  return <div ref={wrapperRef}>{children}</div>;
}
