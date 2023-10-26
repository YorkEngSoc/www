export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EventsGrid, { EventT } from "../pageFragments/EventsGrid";
import EventsBase from "./base";
import { cookies } from "next/headers";
import React, { useMemo } from "react";
import { DateTime } from "luxon";

export default async function Events() {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const yesterday = DateTime.now().toUTC().minus({ days: 1 }).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    let { data: events } = (await supabase
      .from("events")
      .select()
      .eq("visible", true)
      .gt("start", yesterday)) as {
      data: EventT[] | null;
    };

    if (!events) events = [];

    events.forEach((event) => {
      if (typeof event.image === "string" && event.image.length > 0) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("events").getPublicUrl(event.image);

        event.image = publicUrl;
      }
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
