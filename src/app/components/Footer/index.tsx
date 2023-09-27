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
    <footer className="w-full flex flex-row justify-between px-10 py-2 relative footer items-center mt-auto">
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
      <div className="flex flex-row">
        <DiscordButton tw="inline-block w-max mr-4 hover:scale-100 hover:translate-y-0" />
        <LinkButton href="#" tw="aspect-square inline-block p-2 mr-4 bg-white hover:scale-100 hover:translate-y-0">
          <Image
            src={instagram}
            alt="Instagram logo."
            className="object-contain w-7 h-7"
          />
        </LinkButton>
        <LinkButton href="#" tw="aspect-square inline-block p-2 bg-white hover:scale-100 hover:translate-y-0">
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
