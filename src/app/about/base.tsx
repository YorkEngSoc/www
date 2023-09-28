import AboutImages from "@components/AboutImages";
import AnimatedLinkButton from "@components/AnimatedLinkButton";
import SectionTitle from "@components/SectionTitle";
import Image from "next/image";
import header from "./assets/header.svg";

type AboutBaseT = {
  children: React.ReactNode;
};

export default function AboutBase({ children }: AboutBaseT) {
  return (
    <main>
      <Image
        src={header}
        alt="Sci-Fi artwork"
        className="mx-auto"
      />
      <SectionTitle title="About Us" tw="pt-6" />
      <p className="text-4xl px-10 pt-2 text-white">
        Since 1900, we have been empowering our members to drive innovation,
        shape the future, and excel in their careers by fostering a dynamic
        community of learning, mentorship and transformative experiences. Many
        of our alumni have gone on to have very successful international
        careers.
      </p>
      <AboutImages />
      {children}
      <div className="w-max mx-auto py-16">
        <AnimatedLinkButton
          text="Visit our YUSU page"
          href="https://yusu.org/activities/view/28"
          newtab={true}
        />
      </div>
    </main>
  );
}
