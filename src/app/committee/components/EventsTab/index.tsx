import { useEffect, useState } from "react";
import EventsGrid, { EventT } from "../../../pageFragments/EventsGrid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "next-auth/react";

export default function EventsTab() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventT[] | null>(null);

  useEffect(() => {
    let ignore = false;
    if (session && !ignore) {
      const { supabaseAccessToken } = session;
      const supabase = createClientComponentClient({
        options: {
          global: {
            headers: {
              Authorization: `Bearer ${supabaseAccessToken}`,
            },
          },
        },
      });

      supabase
        .from("events")
        .select()
        .neq("id", 1)
        .then((res) => {
          const { data: events, error } = res;

          if (error) console.error(error);

          if (events) {
            events.forEach((event) => {
              if (typeof event.image === "string" && event.image.length > 0) {
                const {
                  data: { publicUrl },
                } = supabase.storage.from("events").getPublicUrl(event.image);

                event.image = publicUrl;
              }
            });
          }

          setEvents(events as EventT[] | null);
        });

      return () => {
        ignore = true;
      };
    }
  }, [session]);
  return (
    <>
      {events ? (
        <EventsGrid data={events} isAdmin={true} />
      ) : (
        <EventsGrid loading={true} />
      )}
    </>
  );
}
