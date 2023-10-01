import SectionTitle from "@components/SectionTitle";
import "./index.css";

export default function Events() {
  return (
    <div className="w-full relative h-max">
      <div className="relative z-10 bg-events lg:pb-48 xl:pb-72 2xl:pb-96 h-max">
        <SectionTitle
          title="Our Events"
          tw="pt-4 pl-2 lg:pl-0 lg:text-right lg:pr-10 text-white"
        />
        <p className="px-2 lg:px-10 text-white text-xl md:text-3xl lg:text-4xl py-10">
          From enriching learning opportunities to regular social gatherings,
          our events fuel your engineering passion, connect you with industry
          leaders and foster a vibrant community spirit.
        </p>
      </div>
    </div>
  );
}
