"use client";

import Image from "next/image";
import logo from "../sharedAssets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./index.css";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="grid w-full fixed top-0 md:py-2 z-[500]">
      <div className="w-full xl:w-1/3 mx-auto md:w-2/3 text-xs text-white md:rounded-full py-2 px-14 items-center backdrop-blur-xl bg-zinc-700 bg-opacity-[0.35] flex flex-row justify-between">
        <Image src={logo} alt="York Engineering Society Logo" className="hidden md:inline-block"/>
        <Link href="/" className={pathName.length === 1 ? "active" : ""}>
          Home
        </Link>
        <Link
          href="/about"
          className={pathName.includes("about") ? "active" : ""}
        >
          About
        </Link>
        <Link
          href="/events"
          className={pathName.includes("events") ? "active" : ""}
        >
          Events
        </Link>
      </div>
    </nav>
  );
}
