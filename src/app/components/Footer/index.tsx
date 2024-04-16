import DiscordButton from "@components/DiscordButton";
import LinkButton from "@components/LinkButton";
import Image from "next/image";
import Link from "next/link";
import logo from "../sharedAssets/logo.png";
import github from "./assets/github.png";
import instagram from "./assets/instagram.png";
import linkedin from "./assets/linkedin.png";
import "./index.css";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-between px-2 md:px-6 lg:px-10 py-2 relative footer items-center mt-auto">
      <div className="flex flex-col md:block">
        <Image
          src={logo}
          alt="York Engineering Society Logo"
          className="inline mx-auto"
        />
        <span className="text-white pt-2 md:pt-0 md:pl-4 text-sm md:text-base">
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
      <div className="flex flex-row pt-2 md:pt-0 w-full md:w-auto justify-between md:justify-normal">
        <DiscordButton tw="inline-block w-1/2 md:w-max mr-4 hover:scale-100 hover:translate-y-0 p-1 md:p-2" />
        <LinkButton
          href="https://instagram.com/yorkengsoc"
          target="_blank"
          referrerPolicy="no-referrer"
          tw="aspect-square inline-block p-1 md:p-2 mr-4 bg-white hover:scale-100 hover:translate-y-0"
        >
          <Image
            src={instagram}
            alt="Instagram logo."
            className="object-contain w-7 h-7"
          />
        </LinkButton>
        <LinkButton
          href="https://github.com/YorkEngSoc"
          target="_blank"
          referrerPolicy="no-referrer"
          tw="aspect-square h-max inline-block p-1 md:p-2 mr-4 bg-white hover:scale-100 hover:translate-y-0"
        >
          <Image
            src={github}
            alt="Github logo."
            className="object-contain w-7 h-7"
          />
        </LinkButton>
        <LinkButton
          href="https://www.linkedin.com/company/yorkengsoc/"
          target="_blank"
          referrerPolicy="no-referrer"
          tw="aspect-square h-max inline-block p-1 md:p-2 bg-white hover:scale-100 hover:translate-y-0"
        >
          <Image
            src={linkedin}
            alt="Linkedin logo."
            className="object-contain w-7 h-7"
          />
        </LinkButton>
      </div>
    </footer>
  );
}
