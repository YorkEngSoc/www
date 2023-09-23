import Image from "next/image";
import { Lexend } from "next/font/google";
import HeroImage from "@components/HeroImage";

const lexend = Lexend({ subsets: ["latin"], preload: true });

export default function Home() {
  return (
    <main className="w-full  flex flex-col relative">
      <h1
        className={`px-10 pt-32 relative text-white 2xl:text-9xl lg:text-7xl xl:text-8xl 2xl:leading-normal xl:leading-normal lg:leading-normal z-0 ${lexend.className}`}
      >
        <span className="relative z-50 mix-blend-exclusion">
          Collaborate.
          <br />
          Innovate.
          <br />
          Discover.
          <br />
        </span>
        <HeroImage />
      </h1>
      <h4 className={`text-white ${lexend.className}`}>
        Say YES to York Engineering Society
      </h4>
    </main>
  );
}
