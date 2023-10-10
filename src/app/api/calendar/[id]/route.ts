import { NextRequest, NextResponse } from "next/server";
import { EventT } from "../../../pageFragments/EventsGrid";
import ical from "ical-generator";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookiesStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookiesStore,
  });

  const { data: events, error } = await supabase
    .from("events")
    .select()
    .eq("id", params.id);

  if (error) {
    console.error(error);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }

  if (events && events.length > 0) {
    const event = events[0] as EventT;

    const invite = ical({ name: event.title });
    invite.createEvent({
      description: event.short_description,
      summary: event.title,
      start: event.start,
      end: event.end,
      location: event.location,
    });

    const res = new NextResponse(invite.toBlob(), {
      status: 200,
    });
    res.headers.set("Content-Type", "text/calendar");
    res.headers.set(
      "Content-Disposition",
      `attachment; filename=${event.title.replaceAll(" ", "_")}.ics`
    );

    return res;
  }

  return new NextResponse(JSON.stringify({ message: "No event supplied" }), {
    status: 400,
  });
}
