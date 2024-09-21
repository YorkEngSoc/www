import DiscordButton from "@components/DiscordButton";
import LinkButton from "@components/LinkButton";
import lexend from "../lexend";

export default function Join() {
  return (
    <div className="py-20 lg:py-32 flex flex-col" id="join">
      <h1 className="text-center text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-white">
        Join Us{" "}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-dodger-blue-500 to bg-indigo-500">
          Today
        </span>
      </h1>
      <h2 className="font-bold text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none text-white">
        <span className="text-dodger-blue-500">Free</span> for engineering
        students
      </h2>
      <div className="flex flex-col items-center md:flex-row justify-between md:mx-auto pt-10 gap-4 md:gap-0">
        <DiscordButton tw="md:mr-10 w-2/3 md:w-auto" />
        <LinkButton
          href="join"
          tw="w-2/3 text-center md:w-auto"
          target="_blank"
          referrerPolicy="no-referrer">
          I&rsquo;m an engineer
        </LinkButton>
        <LinkButton
          href="/yorksu"
          tw="w-2/3 text-center md:ml-10 md:w-auto"
          target="_blank"
          referrerPolicy="no-referrer">
          All other students
        </LinkButton>
      </div>
    </div>
  );
}
