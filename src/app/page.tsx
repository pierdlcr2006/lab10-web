import Link from "next/link";
import { IoGameController, IoPlanetOutline, IoCodeSlash } from "react-icons/io5";
import RenderBadge from "@/components/RenderBadge";

export default function Home() {
  return (
    <div className="home-mesh min-h-screen text-white">
      {/* Barra superior visible */}
      <div className="border-b border-white/10 bg-black/50 px-4 py-2 text-center text-xs font-semibold tracking-widest text-slate-400 uppercase backdrop-blur-sm">
        C24 · Desarrollo Web Avanzado · Next.js App Router
      </div>

      <main className="mx-auto flex min-h-[calc(100vh-36px)] max-w-6xl flex-col items-center justify-center gap-10 px-4 py-12 md:py-16">
        {/* Hero */}
        <section className="animate-fade-in-up w-full text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300">
            <IoCodeSlash className="text-violet-400" />
            SSG · ISR · CSR
          </div>

          <h1 className="font-display text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
            <span className="block text-white">Aplicaciones</span>
            <span className="bg-gradient-to-r from-[#e3350d] via-[#97ce4c] to-[#42f5b3] bg-clip-text text-transparent">
              Web Avanzado
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base text-slate-400 md:text-lg">
            Dos demos interactivas para explorar estrategias de renderizado en
            Next.js 16.
          </p>
        </section>

        {/* Tarjetas grandes — diseño muy distinto por sección */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Pokémon */}
          <Link
            href="/pokemon"
            className="animate-fade-in-up group relative overflow-hidden rounded-2xl border-4 border-black bg-[#e3350d] p-1 shadow-[8px_8px_0_#000] transition-all hover:shadow-[12px_12px_0_#000] hover:-translate-y-1"
            style={{ animationDelay: "100ms" }}
          >
            <div className="rounded-xl bg-[#f8f4e8] p-6 text-black md:p-8">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-4 border-black bg-white shadow-[4px_4px_0_#000]">
                  <IoGameController size={36} className="text-[#e3350d]" />
                </div>
                <RenderBadge mode="ISR" detail="24h" variant="pokemon" />
              </div>

              <h2 className="font-display text-3xl font-black uppercase md:text-4xl">
                Pokédex
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                151 Pokémon con rutas dinámicas, SSG en build y revalidación
                cada 24 horas. Tarjetas estilo consola clásica.
              </p>

              <div className="poke-screen mt-6 flex h-20 items-center justify-center">
                <span className="font-mono text-lg font-bold tracking-widest text-[#9edc9e] animate-float">
                  ▶ ENTRAR
                </span>
              </div>
            </div>
          </Link>

          {/* Rick */}
          <Link
            href="/rick"
            className="animate-fade-in-up group relative overflow-hidden rounded-2xl border-2 border-[#42f5b3]/60 bg-black p-6 shadow-[0_0_40px_rgba(66,245,179,0.15)] transition-all hover:border-[#42f5b3] hover:shadow-[0_0_60px_rgba(66,245,179,0.35)] hover:-translate-y-1 md:p-8"
            style={{ animationDelay: "200ms" }}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#42f5b3]/20 blur-3xl animate-portal" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#97ce4c]/15 blur-2xl" />

            <div className="relative">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#42f5b3] bg-black text-[#42f5b3] shadow-[0_0_20px_rgba(66,245,179,0.5)]">
                  <IoPlanetOutline size={36} className="animate-portal" />
                </div>
                <RenderBadge mode="CSR" variant="rick" />
              </div>

              <h2 className="font-display text-3xl font-black text-[#97ce4c] md:text-4xl">
                Rick & Morty
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Búsqueda en tiempo real con filtros CSR. Datos iniciales en
                caché (SSG) y detalle con ISR de 10 días.
              </p>

              <p className="mt-6 font-mono text-sm font-bold text-[#42f5b3] transition group-hover:tracking-widest">
                ABRIR PORTAL →
              </p>
            </div>
          </Link>
        </div>

        <footer className="w-full border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          <p>Docente: Ricardo Coello Palomino</p>
          <p className="mt-1">Sección C-D</p>
        </footer>
      </main>
    </div>
  );
}
