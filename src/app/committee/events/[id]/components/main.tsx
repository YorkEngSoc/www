import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { EventT } from "../../../../pageFragments/EventsGrid";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm, SubmitHandler } from "react-hook-form";
import EventForm from "./EventForm";

type AdminEventMainT = {
  eventId?: string;
};

export default function AdminEventMain({ eventId }: AdminEventMainT) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  const [event, setEvent] = useState<EventT | undefined>(undefined);

  useEffect(() => {
    let ignore = false;
    if (session && !ignore && eventId !== "new") {
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
        .eq("id", eventId)
        .then((res) => {
          const { data: events, error } = res;

          if (error) console.error(error);

          if (events && events.length > 0)
            setEvent(events[0] as EventT | undefined);
          else setEvent(undefined);
        });

      return () => {
        ignore = true;
      };
    }
  }, [session]);

  return (
    <>
      {event || eventId === "new" ? (
        <div>
          <EventForm event={event} />
        </div>
      ) : (
        <div className="text-center text-white">Loading content</div>
      )}
    </>
  );
}
