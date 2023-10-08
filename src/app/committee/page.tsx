import { SessionProvider } from "next-auth/react";
import MainCommitte from "./components/main";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import EventsTab from "./components/EventsTab";
import CommitteeTab from "./components/CommitteeTab";

export default async function Committee() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col pt-20">
      <MainCommitte
        session={session ? true : false}
        eventsTab={<EventsTab />}
        committeeTab={<CommitteeTab />}
      />
    </main>
  );
}
