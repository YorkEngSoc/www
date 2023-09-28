import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EventsGrid, { EventT } from "../pageFragments/EventsGrid";
import EventsBase from "./base";
import { cookies } from "next/headers";

export default async function Events() {
  try {
    const supabase = createServerComponentClient({ cookies });

    let { data: events } = (await supabase.from("events").select()) as {
      data: EventT[] | null;
    };

    if (!events) events = [];

    events.push({
      id: -1,
      title: "Weekly Labs",
      body: "Join us if you need help with any of your projects",
      form: "",
      location: "P/T/401",
      start: "Every Wednesday 2:30pm-5:00pm",
      end: "",
      image: "",
    });

    return (
      <EventsBase>
        <EventsGrid data={events} />
      </EventsBase>
    );
  } catch (e) {
    console.error(e);
    return (
      <EventsBase>
        <EventsGrid loading={true} />
      </EventsBase>
    );
  }
}
