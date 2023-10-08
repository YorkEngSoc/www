import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { CommitteeMemberT } from "../../pageFragments/Committee";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import sharp from "sharp";
import { EventT } from "../../pageFragments/EventsGrid";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await req.formData();

    const image = data.get("image") as File | null;
    const memberString = data.get("member") as string | null;
    const eventString = data.get("event") as string | null;

    const supabaseEndpoint = memberString ? "committee" : "events";
    const messageWord = memberString ? "member" : "event";

    let inputData: EventT | CommitteeMemberT | undefined = undefined;
    if (memberString) inputData = JSON.parse(memberString);
    if (eventString) inputData = JSON.parse(eventString);

    if (inputData) {
      const initialId = inputData.id;
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

        if (inputData.image && typeof inputData.image === "string") {
          const { data, error } = await supabase.storage
            .from(supabaseEndpoint)
            .remove([inputData.image]);

          if (error || !data) {
            console.error(error);

            return new Response("Could not delete previous image", {
              status: 500,
            });
          }
        }

        inputData.image = sanitisedFileName;

        const sharpImage = sharp(await image.arrayBuffer());
        const { height, width, format } = await sharpImage.metadata();

        inputData.image_w = width ?? 0;
        inputData.image_h = height ?? 0;

        const sigma = 1 + Math.max(width ?? 0, height ?? 0) / 40;
        const base64Image = (
          await sharpImage
            .blur(sigma)
            .resize(Math.floor((width ?? 0) / 2), Math.floor((height ?? 0) / 2))
            .toBuffer()
        ).toString("base64");

        inputData.placeholder_image = `data:image/${format};base64,${base64Image}`;

        const { error } = await supabase.storage
          .from(supabaseEndpoint)
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

      if (inputData.id) {
        const { error, data } = await supabase
          .from(supabaseEndpoint)
          .update(inputData)
          .eq("id", inputData.id);

        if (error) {
          return new Response(
            JSON.stringify({ message: `Could not update ${messageWord}` }),
            {
              status: 500,
            }
          );
        }
      } else {
        const { error, data } = await supabase
          .from(supabaseEndpoint)
          .insert(inputData)
          .select();

        if (data && data[0]) {
          inputData.id = data[0].id;
        }

        if (error) {
          console.error(error);

          return new Response(
            JSON.stringify({ message: `Could not create ${messageWord}` }),
            {
              status: 500,
            }
          );
        }
      }

      return new Response(
        JSON.stringify({
          message: `Successfully ${
            initialId ? "updated" : "created"
          } ${messageWord}`,
          id: inputData.id,
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
    const memberId = data.get("memberId") as string | null;
    const eventId = data.get("eventId") as string | null;

    const supabaseEndpoint = memberId ? "committee" : "events";
    const messageWord = memberId ? "member" : "event";

    let id: string | undefined = undefined;
    if (memberId) id = memberId;
    if (eventId) id = eventId;

    if (id) {
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

      const { data, error } = await supabase
        .from(supabaseEndpoint)
        .delete()
        .eq("id", id)
        .select();

      if (error || !data || data.length === 0) {
        console.error(error);

        return new Response(
          JSON.stringify({ message: `Could not delete ${messageWord}` }),
          {
            status: 500,
          }
        );
      }

      const entity = data[0] as CommitteeMemberT | EventT;

      if (entity.image) {
        const { data, error } = await supabase.storage
          .from(supabaseEndpoint)
          .remove([entity.image as string]);

        if (error) {
          console.error(error);

          return new Response(
            JSON.stringify({
              message: `Could not delete ${messageWord} image`,
            }),
            {
              status: 500,
            }
          );
        }
      }

      return new Response(
        JSON.stringify({
          message: `Successfully deleted ${messageWord}`,
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
