import SectionTitle from "@components/SectionTitle";
import Link from "next/link";

export default function Schedule() {
  return (
    <div className="pb-10">
      <SectionTitle title="Schdule" />
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="flex flex-col pt-4 text-white px-2 lg:pl-10 md:pr-0">
          <p className="text-xl sm:text-3xl lg:text-4xl">
            Check out what we are up to.
            <br />
            Make sure to select "Add to Calendar" or the blue "+" button to add
            the events to your calendar.
            <br /> <br />
            We look forward to seeing you there!
          </p>
        </div>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FLondon&showPrint=0&showTz=0&showTabs=0&showDate=0&showNav=0&mode=AGENDA&hl=en_GB&src=Y181YzM0ZGYwMDUyMWE5MWQ3ZjJlYjgwMWQ2MTRlYmUyODM1YTE4NmM4YTE3ZmVkZTZhZDMyOTliMGU1ZTAyZDI1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%233F51B5"
          className="border-0 mx-auto my-auto w-3/4 h-80 lg:w-3/4 lg:h-80 aspect-[16/9] pt-4 md:pt-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}
