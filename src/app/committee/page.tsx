"use client";

import { SessionProvider } from "next-auth/react";
import MainCommitte from "./components/main";

export default function Committee() {
  return (
    <SessionProvider>
      <main className="flex flex-col pt-20">
        <MainCommitte />
      </main>
    </SessionProvider>
  );
}
