import DiscordButton from "@components/DiscordButton";
import LinkButton from "@components/LinkButton";
import Image from "next/image";
import Link from "next/link";
import logo from "../sharedAssets/logo.png";
import github from "./assets/github.png";
import instagram from "./assets/instagram.png";
import "./index.css";

export default function Footer() {
  return (
    <footer className="w-full flex flex-row justify-between px-10 py-2 relative footer items-center">
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
        <DiscordButton tw="inline-block w-max mr-4" />
        <LinkButton href="#" tw="aspect-square inline-block p-2 mr-4 bg-white">
          <Image
            src={instagram}
            alt="Instagram logo."
            className="object-contain w-7 h-7"
          />
        </LinkButton>
        <LinkButton href="#" tw="aspect-square inline-block p-2 bg-white">
          <Image
            src={github}
            alt="Github logo."
            className="object-contain w-7 h-7"
          />
        </LinkButton>
      </div>
    </footer>
  );
}
