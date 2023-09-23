"use client";

import Image from "next/image";
import logo from "./assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./index.css";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="w-full sticky top-0 backdrop-blur-md px-10 py-2 grid grid-cols-3 items-center">
      <Link href="/">
        <Image src={logo} alt="York Engineering Society Logo" />
      </Link>
      <div className="w-full text-xs text-white rounded-full py-2 px-14 items-center backdrop-blur-xl bg-zinc-700 bg-opacity-[0.35] flex flex-row justify-between">
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
