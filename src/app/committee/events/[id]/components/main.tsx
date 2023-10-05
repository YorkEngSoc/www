import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { EventT } from "../../../../pageFragments/EventsGrid";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm, SubmitHandler } from "react-hook-form"
import EventForm from "./EventForm";

export default function AdminEventMain() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  const [event, setEvent] = useState<EventT | null>(null);

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

          if (events && events.length > 0) setEvent(events[0] as EventT | null);
          else setEvent(null);
        });

      return () => {
        ignore = true;
      };
    }
  }, [session]);

  return (
    <>
      {event ? (
        <div>
            <EventForm event={event}/>
        </div>
      ) : (
        <div className="text-center text-white">Loading content</div>
      )}
    </>
  );
}
