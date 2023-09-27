"use client";

import Image from "next/image";
import { useEffect } from "react";
import header from "./assets/header.svg";
import "./index.css";

export default function AboutArtwork() {
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const y = window.scrollY;

      const percentage =
        Math.min(Math.max(y / windowHeight - 0.1, 0), 0.5) / 0.4;

      document.documentElement.style.setProperty(
        "--header-offset",
        `${percentage * 100}%`
      );
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Image
      src={header}
      alt="Sci-Fi artwork"
      className="object-contain w-auto h-[30vh] fixed top-20 left-1/2 -translate-x-1/2 -translate-y-[var(--header-offset)]"
    />
  );
}
