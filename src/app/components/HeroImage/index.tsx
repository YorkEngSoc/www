"use client";

import Image from "next/image";
import space from "./assets/space.jpg";
import bridge from "./assets/bridge.jpg";
import pcb from "./assets/pcb.jpg";
import "./index.css";

export default function HeroImage() {
  return (
    <div className="absolute z-0 w-full h-full top-32 left-0 mix-blend-normal">
      <Image
        src={space}
        className="hero-image shadow-2xl shadow-fuchsia-700 aspect-square rounded-full object-cover left-[110%] absolute -z-10"
        alt="An image of space."
        style={{
          animationDuration: "10s",
        }}
      />
      <Image
        src={bridge}
        className="hero-image shadow-2xl shadow-yellow-700 aspect-square rounded-full object-cover -left-3/4 top-1/4 absolute -z-10"
        alt="An image of a bridge."
        style={{
          animationDuration: "11s",
        }}
      />
      <Image
        src={pcb}
        className="hero-image shadow-2xl shadow-dodger-blue-700 aspect-square rounded-full object-cover left-3/4 top-3/4 absolute -z-10"
        alt="An image of a pcb."
        style={{
          animationDuration: "12s",
        }}
      />
    </div>
  );
}
