import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { EventT } from "../../pageFragments/EventsGrid";
import { cookies } from "next/headers";
import Image from "next/image";
import pink from "../../pageFragments/EventsGrid/assets/pink.jpg";
import Link from "next/link";
import LinkButton from "@components/LinkButton";
import CalendarIcon from "@components/CalendarIcon";
import LocationIcon from "@components/LocationIcon";

export default async function Event({ params }: { params: { id: string } }) {
  try {
    const supabase = createServerComponentClient({ cookies });

    let { data: events } = (await supabase
      .from("events")
      .select()
      .eq("id", params.id)) as {
      data: EventT[] | null;
    };

    let event = undefined;

    if (events && events.length > 0) event = events[0];

    if (event) {
      return (
        <main className="grid text-white">
          <div className="sticky top-0 w-full h-[40vh]">
            <div className="w-full h-full relative overflow-clip">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={`${event.title} brochure image.`}
                  placeholder="blur"
                  blurDataURL={event.placeholder_image}
                  className="w-full h-full object-cover event-gradient"
                />
              ) : (
                <Image
                  src={pink}
                  alt={`${event.title} brochure image.`}
                  placeholder="blur"
                  className="w-full h-full object-cover event-gradient"
                />
              )}
              <div className="absolute w-full h-full top-0 left-0 bg-dodger-blue-950 bg-opacity-40 event-gradient" />
              <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-8xl">
                {event.title}
              </h1>
            </div>
          </div>
          <div className="w-1/2 mx-auto flex flex-row event-shard relative border-l-2 border-b-2 border-zinc-700 rounded-bl-xl">
            <div className="w-2/3 pt-2 pl-4">
              <h2 className="text-5xl">What&rsquo;s this event?</h2>
              <div
                className="text-xl pt-10"
                dangerouslySetInnerHTML={{ __html: event.body }}
              ></div>
            </div>
            <div className="w-1/3 pt-2 pr-2 pl-6 pb-10 border-l-2 border-zinc-700">
              <div>
                <h3 className="text-3xl items-center flex">
                  <CalendarIcon tw="w-9 h-9 inline" /> When:
                </h3>
                <p className="text-xl pt-2">
                  Start:{" "}
                  {event.start
                    ? new Date(event.start).toLocaleString()
                    : "Every Wednesday 14:30"}
                </p>
                <p className="text-xl">
                  End:{" "}
                  {event.end ? new Date(event.end).toLocaleString() : "17:00"}
                </p>
              </div>
              <div className="pt-10">
                <h3 className="text-3xl items-center flex">
                  <LocationIcon tw="w-9 h-9 inline" /> Where:
                </h3>
                <p className="text-xl pt-2">{event.location}</p>
              </div>
              {event.form && (
                <div className="pt-10">
                  <LinkButton
                    href={event.form}
                    tw="w-full block text-center bg-dodger-blue-500 border-dodger-blue-500"
                  >
                    Register
                  </LinkButton>
                </div>
              )}
            </div>
          </div>
        </main>
      );
    } else throw new Error(`Event ${params.id} does not exist`);
  } catch (e) {
    console.error(e);
  }
}
