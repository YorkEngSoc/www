import Image from "next/image";
import logo from "../sharedAssets/logo.png";
import "./index.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-row justify-between px-10">
      <div>
        <Image
          src={logo}
          alt="York Engineering Society Logo"
          className="inline"
        />
        <span className="text-white pl-4">
          WebDev{" "}
          <Link
            href="https://barillari.me"
            className="text-blue-500 hover:line-through"
            referrerPolicy="no-referrer"
            target="_blank"
          >
            @Giuseppe Barillari
          </Link>
        </span>
      </div>
      <div>
        
      </div>
    </footer>
  );
}
