import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { InferGetServerSidePropsType, Metadata } from "next";
import { cookies } from "next/headers";
import Committee, { CommitteeMemberT } from "../pageFragments/Committee";
import AboutBase from "./base";

export const metadata: Metadata = {
  title: "YES | About",
  description: "What is YES and who is on the committee",
};

export default async function About() {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const { data: committee } = (await supabase
      .from("committee")
      .select()
      .order("id")) as {
      data: CommitteeMemberT[] | null;
    };

    if (committee) {
      for (const idx in committee) {
        const member = committee[idx];
        const { data, error } = await supabase.storage
          .from("committee")
          .createSignedUrl(member.image, 60);

        if (data && data.signedUrl) member.image = data.signedUrl;
        else
          throw new Error(
            `${member.name}'s image does not exist on bucket: ${error}`
          );
      }

      return (
        <AboutBase>
          <Committee data={committee} />
        </AboutBase>
      );
    } else {
      throw new Error("Committee array is empty");
    }
  } catch (e) {
    console.error(e);
    return (
      <AboutBase>
        <Committee loading={true} />
      </AboutBase>
    );
  }
}
