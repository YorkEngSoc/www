import { Metadata } from "next";
import AboutImages from "@components/AboutImages";
import AnimatedLinkButton from "@components/AnimatedLinkButton";
import SectionTitle from "@components/SectionTitle";
import Image from "next/image";
import header from "./assets/header.svg";

export const metadata: Metadata = {
  title: "YES | About",
  description: "What is YES and who is on the committee",
};

export default async function About() {
  return (
    <main>
      <Image src={header} alt="Sci-Fi artwork" className="mx-auto" />
      <SectionTitle title="About Us" tw="pt-6" />
      <p className="text-xl sm:text-3xl lg:text-4xl px-2 lg:px-10 pt-2 text-white">
        Ever since we were founded, we have been empowering our members to drive
        innovation, shape the future, and excel in their careers by fostering a
        dynamic community of learning, mentorship and transformative
        experiences. Many of our alumni have gone on to have very successful
        international careers.
      </p>
      <AboutImages />

      <div className="w-max mx-auto py-16">
        <AnimatedLinkButton
          text="Visit our YUSU page"
          href="/yorksu"
          newtab={true}
        />
      </div>
    </main>
  );
}
