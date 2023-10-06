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

      let imagePathRes: string | undefined = undefined;

      if (image) {
        const sanitisedFileName = image.name.replaceAll(/[^a-zA-Z0-9.]+/gi, "");

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
          console.error(error);

          return new Response("Could not upload image", {
            status: 500,
          });
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

          return new Response("Could not update event", {
            status: 500,
          });
        }
      } else {
        const { error } = await supabase.from("events").insert(event);

        if (error) {
          console.error(error);

          return new Response("Could not create event", {
            status: 500,
          });
        }
      }
    }

    return new Response("", {
      status: 200,
    });
  }

  return new Response("", {
    status: 403,
  });
}
