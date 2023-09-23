import lexend from "../lexend";
import "./index.css"

export default function Mission() {
  return (
    <div className="h-[75vh] flex flex-col 2xl:pt-40 xl:pt-28 lg:pt-14 justify-center relative">
      <h1
        className={`text-dodger-blue-500 ${lexend.className} text-8xl pl-10`}
      >
        Our mission
      </h1>
      <p className="max-w-[50%] pl-10 text-white text-3xl py-10">
        Empowering our members to drive innovation, shape the future, and excel
        in their careers by fostering a dynamic community of learning,
        mentorship and transformative experiences.
      </p>
      <div className="absolute w-full h-full -z-10 blur-3xl">
        <div className="h-1/3 aspect-square bg-dodger-blue-800 rounded-full top-[30%] absolute left-[35%] z-10 bubble-top-left blur-2xl"/>
        <div className="h-1/3 aspect-square bg-yellow-500 rounded-full top-1/2 absolute left-[45%] z-20 bubble-middle blur-2xl"/>
        <div className="h-1/3 aspect-square bg-indigo-800 rounded-full top-[30%] absolute left-[55%] z-10 bubble-top-right blur-2xl"/>
      </div>
    </div>
  );
}
