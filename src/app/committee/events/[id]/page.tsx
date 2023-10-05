"use client";

import { SessionProvider } from "next-auth/react";
import AdminEventMain from "./components/main";

export default function AdminEvent() {
  return (
    <SessionProvider>
      <main className="flex flex-col pt-20">
        <AdminEventMain />
      </main>
    </SessionProvider>
  );
}
