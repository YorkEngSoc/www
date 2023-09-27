import { Metadata } from "next";
import AboutArtwork from "@components/AboutArtwork";
import SectionTitle from "@components/SectionTitle";
import AboutImages from "@components/AboutImages";
import Committee from "../pageFragments/Committee";

export const metadata: Metadata = {
  title: "YES | About",
  description: "What is YES and who is on the committee",
};

export default function About() {
  return (
    <main>
      <AboutArtwork />
      <SectionTitle title="About Us" tw="pt-[calc(30vh_+_6rem)]" />
      <p className="text-4xl px-10 pt-2 text-white">
        Since 1900, we have been empowering our members to drive innovation,
        shape the future, and excel in their careers by fostering a dynamic
        community of learning, mentorship and transformative experiences. Many
        of our alumni have gone on to have very successful international
        careers.
      </p>
      <AboutImages />
      <Committee />
    </main>
  );
}
