import SectionTitle from "@components/SectionTitle";
import "./index.css";

type EventsBaseT = {
  children: React.ReactNode;
};

export default function EventsBase({ children }: EventsBaseT) {
  return (
    <main>
      <div className="w-full h-[30vh] bg-qfactor grid mt-12 md:mt-0">
        <SectionTitle
          title="Events"
          tw="pt-20 text-white text-center my-auto"
        />
      </div>
      <div className="py-10">{children}</div>
    </main>
  );
}
