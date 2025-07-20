import { useEffect } from "react";
import type { RefObject } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null> | RefObject<T | null>[],
  callback: (event: AnyEvent) => void,
) {
  const refArray = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    const handleOutsideClick = (event: AnyEvent) => {
      const isOutside = refArray.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node),
      );

      if (isOutside) {
        callback(event);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("touchstart", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("touchstart", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
}
