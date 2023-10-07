import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { EventT } from "../../pageFragments/EventsGrid";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await req.formData();

    const image = data.get("image") as File | null;
    const eventString = data.get("event") as string | null;

    let event: EventT | undefined = undefined;
    if (eventString) event = JSON.parse(eventString);

    if (event) {
      const cookiesStore = cookies();
      const supabase = createRouteHandlerClient(
        {
          cookies: () => cookiesStore,
        },
        {
          options: {
            global: {
              headers: {
                Authorization: `Bearer ${session.supabaseAccessToken}`,
              },
            },
          },
        }
      );

      if (image) {
        const sanitisedFileName = image.name.replaceAll(/[^a-zA-Z0-9.]+/gi, "");

        if (event.image && typeof event.image === "string") {
          const { data, error } = await supabase.storage
            .from("events")
            .remove([event.image]);

          if (error) {
            console.error(error);

            return new Response("Could not delete previous image", {
              status: 500,
            });
          }
        }

        event.image = sanitisedFileName;

        const sharpImage = sharp(await image.arrayBuffer());
        const { height, width, format } = await sharpImage.metadata();

        event.image_w = width;
        event.image_h = height;

        const sigma = 1 + Math.max(width ?? 0, height ?? 0) / 40;
        const base64Image = (
          await sharpImage
            .blur(sigma)
            .resize(Math.floor((width ?? 0) / 2), Math.floor((height ?? 0) / 2))
            .toBuffer()
        ).toString("base64");

        event.placeholder_image = `data:image/${format};base64,${base64Image}`;

        const { error } = await supabase.storage
          .from("events")
          .upload(sanitisedFileName, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error(`For image "${image.name}": ${error.message}`);

          return new Response(
            JSON.stringify({ message: "Could not upload image" }),
            {
              status: 500,
            }
          );
        }
      }

      if (event.body.length === 0) event.body = event.short_description;

      if (event.id) {
        const { error } = await supabase
          .from("events")
          .update(event)
          .eq("id", event.id);

        if (error) {
          console.error(error);

          return new Response(
            JSON.stringify({ message: "Could not update event" }),
            {
              status: 500,
            }
          );
        }
      } else {
        const { error, data } = await supabase
          .from("events")
          .insert(event)
          .select();

        if (data && data[0]) {
          event.id = data[0].id;
        }

        if (error) {
          console.error(error);

          return new Response(
            JSON.stringify({ message: "Could not create event" }),
            {
              status: 500,
            }
          );
        }
      }

      return new Response(
        JSON.stringify({
          message: `Successfully ${event?.id ? "updated" : "created"} event`,
          id: event?.id,
        }),
        {
          status: 200,
        }
      );
    }
  }

  return new Response(JSON.stringify({ message: "Unauthorised" }), {
    status: 403,
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await req.formData();
    const eventId = data.get("eventId") as string | null;

    if (eventId) {
      const cookiesStore = cookies();
      const supabase = createRouteHandlerClient(
        {
          cookies: () => cookiesStore,
        },
        {
          options: {
            global: {
              headers: {
                Authorization: `Bearer ${session.supabaseAccessToken}`,
              },
            },
          },
        }
      );

      const { data: events, error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId)
        .select();

      if (error || !events || events.length === 0) {
        console.error(error);

        return new Response(
          JSON.stringify({ message: "Could not delete event" }),
          {
            status: 500,
          }
        );
      }

      const event = events[0] as EventT;

      if (event.image) {
        const { data, error } = await supabase.storage
          .from("events")
          .remove([event.image as string]);

        if (error) {
          console.error(error);

          return new Response("Could not delete event image", {
            status: 500,
          });
        }
      }

      return new Response(
        JSON.stringify({
          message: "Successfully deleted event",
        }),
        {
          status: 200,
        }
      );
    }
  }

  return new Response(JSON.stringify({ message: "Unauthorised" }), {
    status: 403,
  });
}
