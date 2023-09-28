import LoadingGrid from "@components/LoadingGrid";
import Image from "next/image";

export type EventT = {
  id: number;
  start: string;
  end: string;
  location: string;
  title: string;
  body: string;
  form: string;
  image: string;
};

type EventsGridT = {
  data?: EventT[];
  loading?: boolean;
};

export default function EventsGrid({ loading, data }: EventsGridT) {
  return (
    <>
      {(data || loading) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-10 sm:gap-6 xl:gap-8 pt-10">
          {loading ? (
            <LoadingGrid />
          ) : (
            <>
              {data?.map((event, i) => (
                <div
                  className="px-2 text-dodger-blue-500"
                  key={`committe_member_${i}`}
                >
                  <Image
                    src={event.image}
                    alt={`${event.title} brochure image.`}
                    className="w-full md:w-3/4 mx-auto aspect-square object-center object-cover rounded-xl"
                    placeholder="blur"
                    blurDataURL=""
                  />
                  <div className="flex flex-col p-2 bg-zinc-800">
                    <h3 className="text-dodger-blue-500 font-extrabold">
                      {event.title}
                    </h3>
                    <p className="pt-2 text-white">{event.body}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
