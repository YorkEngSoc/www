import SectionTitle from "@components/SectionTitle";
import "./index.css";

export default function Events() {
  return (
    <main>
      <div className="w-full h-[30vh] bg-qfactor grid mt-12 md:mt-0">
        <SectionTitle
          title="Events"
          tw="pt-20 text-white text-center my-auto"
        />
      </div>
    </main>
  );
}
