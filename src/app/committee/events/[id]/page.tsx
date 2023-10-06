"use client";

import { SessionProvider } from "next-auth/react";
import AdminEventMain from "./components/main";

export default function AdminEvent({ params }: { params: { id: string } }) {
  return (
    <SessionProvider>
      <main className="flex flex-col pt-20">
        <AdminEventMain eventId={params.id} />
      </main>
    </SessionProvider>
  );
}
