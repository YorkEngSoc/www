import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { CommitteeMemberT } from "../../../pageFragments/Committee";
import { redirect } from "next/navigation";
import CommitteeGrid from "@components/CommitteeGrid";

export default async function CommitteeTab() {
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

    const { data, error } = await supabase.from("committee").select();

    if (error) console.error(error);

    let committee: CommitteeMemberT[] | undefined = undefined;

    if (data) {
      committee = data;

      committee.forEach((member) => {
        if (typeof member.image === "string" && member.image.length > 0) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("committee").getPublicUrl(member.image);

          member.image = publicUrl;
        }
      });
    }

    return <CommitteeGrid data={committee} isAdmin={true} />;
  }

  redirect("/");
}
