import { ReactNode } from "react";
import { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Rick & Morty",
  description: "Explora personajes con SSG, ISR y CSR",
};

export default function RickLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-rick min-h-screen">
      <SiteNav theme="rick" />
      <main>{children}</main>
    </div>
  );
}
