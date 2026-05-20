import Link from "next/link";
import { IoGameController, IoPlanetOutline, IoHome } from "react-icons/io5";

type NavTheme = "pokemon" | "rick";

interface SiteNavProps {
  theme: NavTheme;
}

export default function SiteNav({ theme }: SiteNavProps) {
  if (theme === "pokemon") {
    return (
      <header className="sticky top-0 z-50 border-b-4 border-black bg-[#e3350d] shadow-[0_4px_0_#000]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link
            href="/pokemon"
            className="font-display group flex items-center gap-2 text-xl font-black uppercase tracking-tight text-white md:text-2xl"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#f8f4e8] text-[#e3350d] shadow-[2px_2px_0_#000] transition group-hover:scale-105">
              <IoGameController size={22} />
            </span>
            Pokédex
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 rounded-lg border-2 border-black bg-black/20 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-black/40"
            >
              <IoHome size={16} /> Inicio
            </Link>
            <Link
              href="/rick"
              className="rounded-lg border-2 border-black bg-[#97ce4c] px-3 py-1.5 text-sm font-bold text-black transition hover:bg-[#42f5b3]"
            >
              Rick & Morty →
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#42f5b3]/40 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="/rick"
          className="font-display group flex items-center gap-2 text-xl font-black text-[#97ce4c] md:text-2xl"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#42f5b3] bg-black text-[#42f5b3] shadow-[0_0_16px_rgba(66,245,179,0.4)] transition group-hover:shadow-[0_0_24px_rgba(66,245,179,0.7)]">
            <IoPlanetOutline size={22} className="animate-portal" />
          </span>
          Rick & Morty
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-sm font-semibold text-slate-300 transition hover:border-white/40 hover:text-white"
          >
            <IoHome size={16} /> Inicio
          </Link>
          <Link
            href="/pokemon"
            className="rounded-full border-2 border-[#e3350d] bg-[#e3350d] px-3 py-1.5 text-sm font-bold text-white transition hover:bg-[#ff4d2e]"
          >
            Pokédex →
          </Link>
        </nav>
      </div>
    </header>
  );
}
