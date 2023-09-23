import Image from "next/image";
import { Lexend } from "next/font/google";
import HeroImage from "@components/HeroImage";

const lexend = Lexend({ subsets: ["latin"], preload: true });

export default function Home() {
  return (
    <main className="w-full flex min-h-screen">
      <h1
        className={`px-10 pt-10 absolute top-0 left-0 text-white 2xl:text-9xl lg:text-7xl xl:text-8xl 2xl:leading-normal xl:leading-normal lg:leading-normal mix-blend-difference z-0 ${lexend.className}`}
      >
        <HeroImage />
        <span>
          Collaborate.
          <br />
          Innovate.
          <br />
          Discover.
          <br />
        </span>
      </h1>
    </main>
  );
}
