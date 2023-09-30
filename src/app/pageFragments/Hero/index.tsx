import AnimatedLinkButton from "@components/AnimatedLinkButton";
import HeroImage from "@components/HeroImage";
import Image from "next/image";
import artwork from "./assets/home.png";
import "./index.css";

export default function Hero() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between relative">
      <h1 className="text-center pt-32 relative mx-auto text-white 2xl:text-9xl lg:text-7xl xl:text-8xl 2xl:leading-normal xl:leading-normal lg:leading-normal z-50 font-extrabold">
        <span className="relative z-50 mix-blend-exclusion">
          <span className="base-hero-text collaborate">Collaborate.</span>
          <br />
          <span className="base-hero-text innovate">Innovate.</span>
          <br />
          <span className="base-hero-text discover">Discover.</span>
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
