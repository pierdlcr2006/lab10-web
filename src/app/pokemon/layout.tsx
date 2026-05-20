import { ReactNode } from "react";
import { Metadata } from "next";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex - Next.js",
  description: "Explora el mundo Pokémon",
};

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white">
      <nav className="bg-black/40 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/pokemon"
            className="flex items-center gap-3 text-white text-2xl font-black tracking-wider hover:text-yellow-400 transition-all duration-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)] group"
          >
            <IoGameController size={32} className="inline-block transform group-hover:rotate-12 transition-transform duration-300 text-yellow-400" />
            <span>POKÉDEX <span className="text-yellow-400 font-light">NEXT</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Inicio
            </Link>
            <Link
              href="/rick"
              className="text-sm font-medium text-slate-300 hover:text-green-400 transition"
            >
              Rick & Morty
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
