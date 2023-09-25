import Navbar from "@components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@components/Footer";

export const metadata: Metadata = {
  title: "YES | York Engineering Society",
  description: "The University of York Engineering Society",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
