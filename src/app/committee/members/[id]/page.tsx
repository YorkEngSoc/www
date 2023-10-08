import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { CommitteeMemberT } from "../../../pageFragments/Committee";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import MemberForm from "./components/MemberForm";
import "react-toastify/dist/ReactToastify.min.css";


export default async function AdminMember({
  params,
}: {
  params: { id: string };
}) {
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

    let member: CommitteeMemberT | undefined = undefined;

    if (params.id !== "new") {
      const { data: members, error } = await supabase
        .from("committee")
        .select()
        .eq("id", params.id);

      if (error) {
        console.error(error);
      }

      if (members && members.length > 0) member = members[0];
      else redirect("/committee");
    }

    return (
      <main className="flex flex-col pt-20">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <MemberForm member={member} />
      </main>
    );
  }

  redirect("/");
}
