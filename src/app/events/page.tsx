import { createClient } from "@supabase/supabase-js";
import EventsGrid, { EventT } from "../pageFragments/EventsGrid";
import EventsBase from "./base";

export default async function Events() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let { data: events } = (await supabase
      .from("events")
      .select()
      .eq("visible", true)
      .order("start", { ascending: true })) as {
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
