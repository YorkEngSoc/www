import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import EventsGrid, { EventT } from "../../../pageFragments/EventsGrid";
import { DateTime } from "luxon";

export default async function EventsTab() {
  const session = await getServerSession(authOptions);

  if (session) {
    const { supabaseAccessToken } = session;
    const cookiesStore = cookies();
    const supabase = createServerComponentClient(
      { cookies: () => cookiesStore },
      {
        options: {
          global: {
            headers: {
              Authorization: `Bearer ${supabaseAccessToken}`,
            },
          },
        },
      }
    );

    const yesterday = DateTime.now().toUTC().minus({ days: 1 }).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const { data, error } = await supabase
      .from("events")
      .select()
      .neq("id", 1)
      .eq("visible", true)
      .gte("start", yesterday);

    if (error) console.error(error);

    let events: EventT[] | undefined = undefined;

    if (data) {
      events = data;

      events.forEach((event) => {
        if (typeof event.image === "string" && event.image.length > 0) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("events").getPublicUrl(event.image);

          event.image = publicUrl;
        }
      });
    }

    return <EventsGrid data={events} isAdmin={true} />;
  }

  redirect("/");
}
