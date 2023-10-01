import ArrowIcon from "@components/ArrowIcon";
import Link from "next/link";

type AnimatedLinkButtonT = {
  text: string;
  href: string;
  newtab?: boolean;
};

export default function AnimatedLinkButton({
  text,
  href,
  newtab,
}: AnimatedLinkButtonT) {
  return (
    <Link
      className="relative flex pl-5 group w-max z-50 text-white font-normal"
      href={href}
      target={newtab ? "_blank" : undefined}
      referrerPolicy={newtab ? "no-referrer" : undefined}
    >
      <span className="z-20 mix-blend-difference text-lg xl:text-3xl">
        {text} <ArrowIcon tw="inline xl:w-11 xl:h-8 w-10 h-7 pr-5" />
      </span>
      <span className="z-10 absolute top-0 left-0 w-full h-7 lg:w-10 lg:h-10 bg-white rounded-full group-hover:w-full transition-[width] duration-200"></span>
    </Link>
  );
}
