import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import Committee, { CommitteeMemberT } from "../pageFragments/Committee";
import AboutBase from "./base";

export const metadata: Metadata = {
  title: "YES | About",
  description: "What is YES and who is on the committee",
};

export default async function About() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: committee } = (await supabase
      .from("committee")
      .select()
      .order("id")) as {
      data: CommitteeMemberT[] | null;
    };

    if (committee && committee.length > 0) {
      for (const idx in committee) {
        const member = committee[idx];
        const { data } = supabase.storage
          .from("committee")
          .getPublicUrl(member.image);

        if (data && data.publicUrl) member.image = data.publicUrl;
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
