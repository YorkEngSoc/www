"use client";

import { SessionProvider } from "next-auth/react";
import AdminEventMain from "./components/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function AdminEvent({ params }: { params: { id: string } }) {
  if (params.id === "1") {
    return (
      <SessionProvider>
        <main className="flex flex-col pt-20 px-10 min-h-[80vh]">
          <h1 className="text-6xl font-extrabold text-red-500 my-auto">
            You cannot modify the weekly labs event. Please get in touch with
            the website admin.
          </h1>
        </main>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
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
        <AdminEventMain eventId={params.id} />
      </main>
    </SessionProvider>
  );
}
