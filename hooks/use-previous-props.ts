import { useEffect, useRef } from "react";

// egyedi horog
export default function usePreviousProps<K = any>(value: K) {
  const ref = useRef<K>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
