import { ReactNode } from "react";
import { Metadata } from "next";
import { IoPlanetOutline } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick & Morty - Next.js",
  description: "Explora la base de datos de Rick y Morty",
};

interface RickLayoutProps {
  children: ReactNode;
}

export default function RickLayout({ children }: RickLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-emerald-950 text-white">
      <nav className="bg-black/40 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/rick"
            className="flex items-center gap-3 text-white text-2xl font-black tracking-wider hover:text-emerald-400 transition-all duration-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] group"
          >
            <IoPlanetOutline size={32} className="inline-block transform group-hover:rotate-45 transition-transform duration-500 text-emerald-400" />
            <span>RICK & <span className="text-emerald-400 font-light">MORTY</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Inicio
            </Link>
            <Link
              href="/pokemon"
              className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition"
            >
              Pokédex
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
