import HeroImage from "@components/HeroImage";
import Link from "next/link";
import ArrowIcon from "@components/ArrowIcon";
import artwork from "./assets/home.png";
import Image from "next/image";
import lexend from "../lexend";
import AnimatedLinkButton from "@components/AnimatedLinkButton";

export default function Hero() {
  return (
    <div className="min-h-screen w-full flex relative">
      <h1 className="px-10 pt-32 relative text-white 2xl:text-9xl lg:text-7xl xl:text-8xl 2xl:leading-normal xl:leading-normal lg:leading-normal z-50">
        <span className="relative z-50 mix-blend-exclusion">
          Collaborate.
          <br />
          Innovate.
          <br />
          Discover.
          <br />
          <AnimatedLinkButton text="Join today" href="#join" />
        </span>
        <HeroImage />
      </h1>
      <h4 className="text-white relative self-end text-4xl text-right w-full pr-10 pb-10">
        Say{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-dodger-blue-700 via-yellow-500 to-fuchsia-500">
          YES
        </span>{" "}
        to York Engineering Society
      </h4>
      <Image
        src={artwork}
        alt="Sci-Fi artwork"
        className="2xl:w-[720px] 2xl:top-1/2 2xl:-left-10 xl:w-[300px] xl:top-3/4 xl:-left-5 lg:w-[150px] lg:top-[80%] lg:-left-2 aspect-square absolute"
      />
    </div>
  );
}
