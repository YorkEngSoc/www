import HeroImage from "@components/HeroImage";
import Link from "next/link";
import ArrowIcon from "@components/ArrowIcon";
import artwork from "./assets/home.png";
import Image from "next/image";
import lexend from "../lexend";

export default function Hero() {
  return (
    <div className="min-h-screen w-full flex relative">
      <h1 className="px-10 pt-32 relative text-white 2xl:text-9xl lg:text-7xl xl:text-8xl 2xl:leading-normal xl:leading-normal lg:leading-normal z-50">
        <span
          className={`relative z-50 mix-blend-exclusion ${lexend.className}`}
        >
          Collaborate.
          <br />
          Innovate.
          <br />
          Discover.
          <br />
          <Link className="relative flex pl-5 group w-max z-50" href={"#"}>
            <span className="z-20 mix-blend-difference text-3xl">
              Join today <ArrowIcon tw="inline w-11 h-8 pr-5" />
            </span>
            <span className="z-10 absolute top-0 left-0 w-10 h-10 bg-white rounded-full group-hover:w-full transition-[width] duration-200"></span>
          </Link>
        </span>
        <HeroImage />
      </h1>
      <h4
        className={`text-white relative ${lexend.className} self-end text-4xl text-right w-full pr-10 pb-10`}
      >
        Say{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-dodger-blue-700 via-yellow-500 to-pink-500">
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
