export const revalidate = 3600;
export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EventsGrid, { EventT } from "../pageFragments/EventsGrid";
import EventsBase from "./base";
import { cookies } from "next/headers";
import React, { useMemo } from "react";

export default async function Events() {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    let { data: events } = (await supabase
      .from("events")
      .select()
      .eq("visible", true)) as {
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
