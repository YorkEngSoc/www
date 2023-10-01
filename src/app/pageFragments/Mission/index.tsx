import SectionTitle from "@components/SectionTitle";
import "./index.css";

export default function Mission() {
  return (
    <div className="h-[75vh] flex flex-col 2xl:pt-40 xl:pt-28 lg:pt-14 justify-center relative">
      <SectionTitle title="Our Mission" />
      <p className="xl:max-w-[50%] xl:pl-10 px-2 text-white text-xl md:text-3xl lg:text-4xl py-10">
        Empowering our members to drive innovation, shape the future, and excel
        in their careers by fostering a dynamic community of learning,
        mentorship and transformative experiences.
      </p>
      <div className="absolute w-full h-full -z-10 filter blur overflow-clip">
        <div className="h-1/3 aspect-square bg-dodger-blue-500 rounded-full top-1/3 absolute left-[40%] z-10 filter blur-xl mix-blend-multiply opacity-60 bubble-top-left" />
        <div className="h-1/3 aspect-square bg-fuchsia-500 rounded-full top-[40%] absolute left-[45%] z-20  filter blur-xl mix-blend-multiply opacity-60 bubble-middle" />
        <div className="h-1/3 aspect-square bg-yellow-500 rounded-full top-1/3 absolute left-[50%] z-10  filter blur-xl mix-blend-multiply opacity-60 bubble-top-right" />
      </div>
    </div>
  );
}
