import SectionTitle from "@components/SectionTitle";
import "./index.css";

export default function Events() {
  return (
    <div className="w-full relative h-max">
      <div className="relative z-10 bg-events lg:pb-48 xl:pb-72 2xl:pb-96 h-max">
        <SectionTitle
          title="Our Events"
          tw="pt-4 pl-0 text-right pr-10 text-white"
        />
        <p className="px-10 text-white text-3xl py-10">
          From enriching learning opportunities to regular social gatherings,
          our events fuel your engineering passion, connect you with industry
          leaders and foster a vibrant community spirit.
        </p>
      </div>
    </div>
  );
}
