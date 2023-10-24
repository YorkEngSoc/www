import CalendarIcon from "@components/CalendarIcon";
import LazyImg from "@components/LazyImg";
import LoadingGrid from "@components/LoadingGrid";
import LocationIcon from "@components/LocationIcon";
import { DateTime } from "luxon";
import { StaticImageData } from "next/image";
import Link from "next/link";
import pink from "./assets/pink.jpg";

export type EventT = {
  id: number;
  start: string;
  location: string;
  title: string;
  short_description: string;
  body: string;
  form: string;
  image: string | StaticImageData;
  placeholder_image: string;
  image_w?: number;
  image_h?: number;
  visible: boolean;
};

type EventsGridT = {
  data?: EventT[];
  loading?: boolean;
  isAdmin?: boolean;
};

export default function EventsGrid({ loading, data, isAdmin }: EventsGridT) {
  const events = data?.map((event) => {
    if (!event.image) event.image = pink;

    return event;
  });
  return (
    <>
      {(events || loading) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 pt-10 sm:px-10">
          {loading ? (
            <LoadingGrid />
          ) : (
            <>
              {isAdmin && (
                <Link
                  href="/committee/events/new"
                  className="p-2 text-white bg-dodger-blue-500 rounded-lg mx-auto my-auto"
                >
                  Create new event
                </Link>
              )}
              {events?.map((event, i) => (
                <>
                  <div className="px-2 flex">
                    <Link
                      href={`${isAdmin ? "/committee" : ""}/events/${event.id}`}
                      className="block text-dodger-blue-500 rounded-xl relative w-3/4 mx-auto border-2 border-zinc-700 bg-zinc-800 event-shard"
                      key={`committe_member_${i}`}
                    >
                      <LazyImg
                        src={
                          typeof event.image === "string"
                            ? event.image
                            : event.image.src
                        }
                        placeholder={
                          typeof event.image === "string"
                            ? event.placeholder_image
                            : event.image.blurDataURL ?? ""
                        }
                        alt={`${event.title} brochure image.`}
                        tw="w-full aspect-square object-center object-cover event-gradient rounded-t-[calc(0.75rem_-_2px)]"
                      />
                      <div className="flex flex-col p-4 text-left">
                        <h3 className="text-dodger-blue-500 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                          {event.title}
                        </h3>
                        <p className="text-dodger-blue-600 py-4 text-sm sm:text-base lg:text-lg">
                          <CalendarIcon tw="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 inline" />{" "}
                          {DateTime.fromISO(event.start, {
                            setZone: true,
                          }).toFormat("dd/MM/yyyy HH:mm")}
                        </p>
                        <p className="text-dodger-blue-600 pb-4 text-sm sm:text-base lg:text-lg">
                          <LocationIcon tw="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 inline" />{" "}
                          {event.location}
                        </p>
                        <p className="pt-2 text-white text-lg lg:text-xl">
                          {event.short_description}
                        </p>
                      </div>
                      <div className="absolute top-1 left-1 sm:top-4 sm:left-4 text-xs md:text-base rounded-xl bg-zinc-900 p-4 ">
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
