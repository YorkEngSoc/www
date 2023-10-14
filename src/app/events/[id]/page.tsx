import CalendarIcon from "@components/CalendarIcon";
import LinkButton from "@components/LinkButton";
import LocationIcon from "@components/LocationIcon";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { EventT } from "../../pageFragments/EventsGrid";
import pink from "../../pageFragments/EventsGrid/assets/pink.jpg";
import Loading from "./loading";
import { DateTime } from "luxon";

function buildCalendarUrl(event: EventT) {
  const url = new URL("https://calendar.google.com/calendar/render");
  const ukStartTime = DateTime.fromISO(event.start, {
    setZone: true,
  }).toString();
  let start = ukStartTime.replaceAll(/([-:.])+/g, "").split("+")[0];
  start = start.slice(0, start.length - 3);

  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", `${event.title} - EngSoc`);
  url.searchParams.set("dates", `${start}/${start}`);
  url.searchParams.set("ctz", "Europe/London");
  url.searchParams.set("details", event.short_description);
  // TODO: Location isn't picked up on mobile, need to investigate
  url.searchParams.set("location", event.location);

  return url.toString();
}

export default async function Event({ params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    let { data: events } = (await supabase
      .from("events")
      .select()
      .eq("id", params.id)) as {
      data: EventT[] | null;
    };

    let event: EventT | undefined = undefined;

    if (events && events.length > 0) {
      event = events[0];
      if (typeof event.image === "string" && event.image.length > 0) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("events").getPublicUrl(event.image);

        event.image = publicUrl;
      }
    }

    if (event !== undefined) {
      return (
        <main className="grid text-white">
          <div className="md:sticky top-0 w-full h-[40vh]">
            <div className="w-full h-full relative overflow-clip">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={`${event.title} brochure image.`}
                  placeholder="blur"
                  blurDataURL={event.placeholder_image}
                  className="w-full h-full object-cover event-gradient"
                  width={event.image_w}
                  height={event.image_h}
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
              <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-4xl sm:text-5xl lg:text-8xl w-max">
                {event.title}
              </h1>
            </div>
          </div>
          <div className="w-full md:w-3/4 2xl:w-1/2 px-2 md:px-0 mx-auto flex flex-col md:flex-row event-shard relative md:border-l-2 md:border-b-2 border-zinc-700 rounded-bl-xl">
            <div className="w-full md:w-2/3 pt-2 md:px-4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl">
                What&rsquo;s this event?
              </h2>
              <div
                className="text-xl lg:text-3xl xl:text-4xl pt-10"
                dangerouslySetInnerHTML={{ __html: event.body }}
              ></div>
            </div>
            <div className="w-full md:w-1/3 pt-10 md:pt-2 md:pr-2 md:pl-6 pb-10 md:border-l-2 border-zinc-700">
              <div>
                <h3 className="text-3xl items-center flex">
                  <CalendarIcon tw="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 inline" />{" "}
                  When:
                </h3>
                <p className="text-xl pt-2">
                  Start:{" "}
                  {event.start
                    ? DateTime.fromISO(event.start, { setZone: true }).toFormat(
                        "dd/MM/yyyy HH:mm"
                      )
                    : "Every Wednesday 14:30"}
                </p>
                {event.id !== 1 && (
                  <div className="pt-4">
                    <LinkButton
                      href={buildCalendarUrl(event)}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      tw="w-full block text-center bg-dodger-blue-500 border-dodger-blue-500"
                    >
                      Add to calendar
                    </LinkButton>
                  </div>
                )}
              </div>
              <div className="pt-4 md:pt-10">
                <h3 className="text-3xl items-center flex">
                  <LocationIcon tw="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 inline" />{" "}
                  Where:
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
    return <Loading />;
  }
}
