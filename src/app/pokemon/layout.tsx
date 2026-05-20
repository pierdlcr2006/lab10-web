import { ReactNode } from "react";
import { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explora el mundo Pokémon con SSG e ISR",
};

export default function PokemonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-pokemon min-h-screen">
      <SiteNav theme="pokemon" />
      <main>{children}</main>
    </div>
  );
}
