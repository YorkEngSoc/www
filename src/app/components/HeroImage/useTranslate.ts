import { MutableRefObject, useCallback, useEffect, useRef } from "react";

export default function useTranslate() {
  const spaceRef = useRef<HTMLImageElement | null>(null);
  const bridgeRef = useRef<HTMLImageElement | null>(null);
  const pcbRef = useRef<HTMLImageElement | null>(null);

  const refs = [spaceRef, bridgeRef, pcbRef];

  const setSpaceRef = useCallback((node: HTMLImageElement | null) => {
    spaceRef.current = node;
  }, []);

  const setBridgeRef = useCallback((node: HTMLImageElement | null) => {
    bridgeRef.current = node;
  }, []);

  const setPcbRef = useCallback((node: HTMLImageElement | null) => {
    pcbRef.current = node;
  }, []);

  function translate(ev: MouseEvent) {
    const x = ev.clientX / window.innerWidth - 0.5;
    const y = 0.5 - ev.clientY / window.innerHeight;

    refs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.style.setProperty("--tw-translate-x", `${25 * x + 5 * i}%`);
        ref.current.style.setProperty("--tw-translate-y", `${-15 * y + 5 * i}%`);
      }
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", translate);

    return () => window.removeEventListener("mousemove", translate);
  }, []);

  return [setSpaceRef, setBridgeRef, setPcbRef];
}
