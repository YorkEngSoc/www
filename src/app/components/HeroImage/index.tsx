"use client";

import Image from "next/image";
import space from "./assets/space.jpg";
import bridge from "./assets/bridge.jpg";
import pcb from "./assets/pcb.jpg";
import "./index.css";
import useTranslate from "./useTranslate";

export default function HeroImage() {
  const [spaceImageRef, bridgeImageRef, pcbImageRef] = useTranslate();

  return (
    <div className="absolute z-0 max-w-[100vw] h-full top-32 left-0 mix-blend-normal">
      <Image
        ref={spaceImageRef}
        src={space}
        className="w-hero-image aspect-video object-cover translate-x-0 translate-y-0 left-1/2 absolute -z-10 transition-transform duration-150 origin-center"
        alt="An image of space."
      />
      <Image
        ref={bridgeImageRef}
        src={bridge}
        className="w-hero-image aspect-video object-cover translate-x-0 translate-y-0 left-[80%] top-[15%] absolute -z-20 transition-transform duration-150 delay-[5ms] origin-center"
        alt="An image of a bridge."
      />
      <Image
        ref={pcbImageRef}
        src={pcb}
        className="w-hero-image aspect-video object-cover translate-x-0 translate-y-0 left-[100%] top-[30%] absolute -z-30 transition-transform duration-150 delay-[10ms] origin-center"
        alt="An image of a pcb."
      />
    </div>
  );
}
