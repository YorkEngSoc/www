import Image from "next/image";
import space from "./assets/space.jpg";
import bridge from "./assets/bridge.jpg";
import pcb from "./assets/pcb.jpg";
import "./index.css";

export default function HeroImage() {
  return (
    <div className="absolute z-0 w-full h-full top-32 left-0">
      <Image
        src={space}
        className="hero-image shadow-lg sm:shadow-2xl shadow-fuchsia-700 sm:shadow-fuchsia-700 aspect-square rounded-full object-cover left-2/3 -top-20 sm:left-full md:top-0 md:left-[110%] absolute -z-10"
        alt="An image of space."
        style={{
          animationDuration: "10s",
        }}
      />
      <Image
        src={bridge}
        className="hero-image shadow-lg sm:shadow-2xl shadow-yellow-700 sm:shadow-yellow-700 aspect-square rounded-full object-cover left-2 sm:-left-1/3 md:-left-3/4 lg:-left-1/2 3xl:-left-3/4 top-24 lg:top-1/3 absolute -z-10"
        alt="An image of a bridge."
        style={{
          animationDuration: "11s",
        }}
      />
      <Image
        src={pcb}
        className="hero-image shadow-lg sm:shadow-2xl shadow-dodger-blue-700 sm:shadow-dodger-blue-700 aspect-square rounded-full object-cover left-1/2 sm:left-3/4 lg:left-full top-52 sm:top-2/3 lg:top-1/2 2xl:top-1/2 3xl:top-3/4 absolute -z-10"
        alt="An image of a pcb."
        style={{
          animationDuration: "12s",
        }}
      />
    </div>
  );
}
