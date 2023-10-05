"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TabLayout from "./TabLayout";
import TabItem from "./TabItem";
import EventsTab from "./EventsTab";

export default function MainCommitte() {
  const { data: session } = useSession();
  const tabs = ["Events", "Committee"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <>
      {session ? (
        <TabLayout
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          <TabItem activeTab={activeTab} tabName={tabs[0]}>
            <EventsTab />
          </TabItem>
          <TabItem activeTab={activeTab} tabName={tabs[1]}>
            <div className="text-white">{tabs[1]}</div>
          </TabItem>
        </TabLayout>
      ) : (
        <div className="grid items-center">
          <button className="link-button mx-auto" onClick={() => signIn()}>
            Sign In
          </button>
        </div>
      )}
    </>
  );
}
