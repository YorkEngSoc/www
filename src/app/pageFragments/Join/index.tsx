import Link from "next/link";
import lexend from "../lexend";
import LinkButton from "@components/LinkButton";
import DiscordLogo from "@components/DiscordLogo";

export default function Join() {
  return (
    <div className="py-32 flex flex-col">
      <h1 className={`text-center text-9xl ${lexend.className} text-white`}>
        Join Us{" "}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-dodger-blue-500 to bg-indigo-500">
          Today
        </span>
      </h1>
      <h2
        className={`font-bold text-center text-4xl leading-none ${lexend.className} text-white`}
      >
        <span className="text-dodger-blue-500">Free</span> for engineering
        students
      </h2>
      <div className="flex flex-row justify-between mx-auto pt-10">
        <LinkButton href="" tw="mr-10 bg-[#5865F2] border-[#5865F2]">
          <DiscordLogo tw="w-full max-h-7 fill-white" />
        </LinkButton>
        <LinkButton href="">I&rsquo;m and engineer</LinkButton>
        <LinkButton href="" tw="ml-10">
          All other students
        </LinkButton>
      </div>
    </div>
  );
}
