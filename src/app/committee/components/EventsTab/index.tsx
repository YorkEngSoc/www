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
        .then((res) => {
          const { data: events, error } = res;

          if (error) console.error(error);

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
