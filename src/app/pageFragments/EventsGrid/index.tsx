import CalendarIcon from "@components/CalendarIcon";
import LoadingGrid from "@components/LoadingGrid";
import LocationIcon from "@components/LocationIcon";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import pink from "./assets/pink.jpg";

export type EventT = {
  id: number;
  start: string;
  end: string;
  location: string;
  title: string;
  short_description: string;
  body: string;
  form: string;
  image: string | StaticImageData;
  placeholder_image: string;
};

type EventsGridT = {
  data?: EventT[];
  loading?: boolean;
};

export default function EventsGrid({ loading, data }: EventsGridT) {
  const events = data?.map((event) => {
    if (!event.image) event.image = pink;

    return event;
  });
  return (
    <>
      {(events || loading) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-10 sm:px-10">
          {loading ? (
            <LoadingGrid />
          ) : (
            <>
              {events?.map((event, i) => (
                <>
                  <div className="px-2">
                    <Link
                      href={`/events/${event.id}`}
                      className="block text-dodger-blue-500 rounded-xl relative w-full sm:w-3/4 mx-auto border-2 border-zinc-700 bg-zinc-800 event-shard"
                      key={`committe_member_${i}`}
                    >
                      {typeof event.image === "string" ? (
                        <Image
                          src={event.image}
                          alt={`${event.title} brochure image.`}
                          className="w-full aspect-square object-center object-cover event-gradient rounded-t-[calc(0.75rem_-_2px)]"
                          placeholder="blur"
                          blurDataURL={event.placeholder_image}
                        />
                      ) : (
                        <Image
                          src={event.image}
                          alt={`${event.title} brochure image.`}
                          className="w-full aspect-square object-center object-cover event-gradient rounded-t-[calc(0.75rem_-_2px)]"
                          placeholder="blur"
                        />
                      )}
                      <div className="flex flex-col p-4 text-left">
                        <h3 className="text-dodger-blue-500 font-extrabold text-4xl">
                          {event.title}
                        </h3>
                        <p className="text-dodger-blue-600 py-4 text-lg">
                          <CalendarIcon tw="w-10 h-10 inline" />{" "}
                          {event.start
                            ? new Date(event.start).toLocaleString()
                            : "Every Wednesday 14:30"}{" "}
                          -{" "}
                          {event.end
                            ? new Date(event.end).toLocaleString()
                            : "17:00"}
                        </p>
                        <p className="text-dodger-blue-600 pb-4 text-lg">
                          <LocationIcon tw="w-10 h-10 inline" />{" "}
                          {event.location}
                        </p>
                        <p className="pt-2 text-white text-xl">
                          {event.short_description}
                        </p>
                      </div>
                      <div className="absolute top-4 left-4 rounded-xl bg-zinc-900 p-4 ">
                        {event.form ? (
                          <span>Registrations open</span>
                        ) : (
                          <span>No registration needed</span>
                        )}
                      </div>
                    </Link>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
