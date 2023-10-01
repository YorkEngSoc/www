import SectionTitle from "@components/SectionTitle";

export default function Members() {
  return (
    <div className="pt-10 md:pt-20 lg:pt-32">
      <SectionTitle title="Our Members" />
      <p className="px-2 lg:px-10 text-white text-xl md:text-3xl lg:text-4xl py-10">
        A diverse and inclusive community, with not only engineering students
        but those from non-STEM backgrounds. We are committed to fostering an
        environment where a wide range of backgrounds converge to create a rich
        tapestry of ideas and collaboration.
      </p>
    </div>
  );
}
