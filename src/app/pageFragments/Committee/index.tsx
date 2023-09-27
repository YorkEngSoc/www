import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AnimatedLinkButton from "@components/AnimatedLinkButton";
import SectionTitle from "@components/SectionTitle";

export default function Committee() {
  const supabase = createServerComponentClient({ cookies });
  console.log(supabase)
  return (
    <div>
      <SectionTitle title="Our Committee" tw="pt-10" />
      <AnimatedLinkButton
        text="Visit our YUSU page"
        href="https://yusu.org/activities/view/28"
        newtab={true}
      />
    </div>
  );
}
