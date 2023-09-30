import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EventsGrid, { EventT } from "../pageFragments/EventsGrid";
import EventsBase from "./base";
import { cookies } from "next/headers";
import React, { useMemo } from "react";

export default async function Events() {
  try {
    const supabase = createServerComponentClient({ cookies });

    let { data: events } = (await supabase.from("events").select()) as {
      data: EventT[] | null;
    };

    if (!events) events = [];

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
