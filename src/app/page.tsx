import Link from "next/link";
import { IoGameController, IoPlanetOutline, IoCodeSlash, IoTerminalOutline, IoFlameOutline, IoSparklesOutline } from "react-icons/io5";
import RenderBadge from "@/components/RenderBadge";

export default function Home() {
  return (
    <div className="home-mesh relative min-h-screen overflow-hidden text-white flex flex-col justify-between">
      {/* Background Elements */}
      <div className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 -bottom-48 h-96 w-96 rounded-full bg-[#42f5b3]/10 blur-3xl" />
      
      {/* Top Bar */}
      <div className="relative z-10 border-b border-white/5 bg-black/60 px-4 py-2.5 text-center text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase backdrop-blur-md">
        <span className="bg-gradient-to-r from-red-400 via-violet-400 to-[#42f5b3] bg-clip-text text-transparent">
          C24 · Desarrollo Web Avanzado · Next.js 16 App Router
        </span>
      </div>

      <main className="relative z-10 mx-auto flex flex-1 max-w-6xl flex-col items-center justify-center gap-12 px-4 py-16 md:py-24">
        {/* Hero Area */}
        <section className="animate-fade-in-up w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-slate-300 uppercase backdrop-blur-sm">
            <IoCodeSlash className="animate-pulse text-violet-400" size={14} />
            Estrategias de Renderizado · SSG · ISR · CSR
          </div>

          <h1 className="font-display text-5xl font-black leading-[1.1] md:text-7xl lg:text-8xl tracking-tight">
            <span className="block text-white opacity-95">Dimensiones</span>
            <span className="block bg-gradient-to-r from-[#e3350d] via-[#a855f7] to-[#42f5b3] bg-clip-text text-transparent filter drop-shadow-sm py-2">
              Web Avanzado
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base text-slate-400 md:text-lg leading-relaxed">
            Explora el rendimiento de Next.js a través de dos demos interactivas e inmersivas con diseños temáticos únicos.
          </p>
        </section>

        {/* Dual Cards */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {/* Pokédex Card */}
          <Link
            href="/pokemon"
            className="animate-fade-in-up group relative overflow-hidden rounded-2xl border-4 border-black bg-[#e3350d] p-1 shadow-[10px_10px_0_#000] transition-all hover:shadow-[14px_14px_0_#000] hover:-translate-y-1.5"
            style={{ animationDelay: "100ms" }}
          >
            {/* Inner frame */}
            <div className="relative overflow-hidden rounded-xl bg-[#f8f4e8] p-6 text-black md:p-8 flex flex-col justify-between h-full min-h-[320px]">
              {/* Retro design details */}
              <div className="absolute top-0 right-0 flex gap-1.5 p-3">
                <span className="h-3 w-3 rounded-full bg-red-500 border border-black animate-led-fast" />
                <span className="h-3 w-3 rounded-full bg-yellow-400 border border-black" />
                <span className="h-3 w-3 rounded-full bg-green-500 border border-black" />
              </div>

              <div>
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-black bg-white shadow-[4px_4px_0_#000] transition-transform group-hover:rotate-6">
                    <IoGameController size={30} className="text-[#e3350d]" />
                  </div>
                  <RenderBadge mode="ISR" detail="24h" variant="pokemon" />
                </div>

                <h2 className="font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
                  Pokédex Kanto
                </h2>
                
                <p className="mt-3 text-sm leading-relaxed text-stone-600 font-medium">
                  Explora los 151 Pokémon originales. Rutas generadas en build (SSG) y revalidadas cada 24 horas. Interfaz inspirada en la clásica consola portátil.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="poke-screen flex-1 flex h-14 items-center justify-center bg-[#4a7c4e] px-4">
                  <span className="font-mono text-base font-bold tracking-widest text-[#9edc9e] animate-pulse">
                    ▶ INICIAR CONSOLA
                  </span>
                </div>
                <div className="ml-4 flex flex-col gap-1.5">
                  <span className="h-2 w-8 rounded-full bg-stone-400 border border-black" />
                  <span className="h-2 w-8 rounded-full bg-stone-400 border border-black" />
                </div>
              </div>
            </div>
          </Link>

          {/* Rick & Morty Card */}
          <Link
            href="/rick"
            className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-[#42f5b3]/40 bg-black/85 p-6 shadow-[0_0_35px_rgba(66,245,179,0.15)] transition-all hover:border-[#42f5b3] hover:shadow-[0_0_55px_rgba(66,245,179,0.35)] hover:-translate-y-1.5 md:p-8 flex flex-col justify-between h-full min-h-[320px]"
            style={{ animationDelay: "200ms" }}
          >
            {/* Glowing neon background portal */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#42f5b3]/20 blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-[#97ce4c]/10 blur-2xl" />

            <div>
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#42f5b3] bg-black/50 text-[#42f5b3] shadow-[0_0_20px_rgba(66,245,179,0.4)] group-hover:shadow-[0_0_30px_rgba(66,245,179,0.7)] transition-all duration-300">
                  <IoPlanetOutline size={30} className="animate-portal" />
                </div>
                <RenderBadge mode="CSR" variant="rick" />
              </div>

              <h2 className="font-display text-3xl font-black tracking-tight text-[#97ce4c] md:text-4xl group-hover:text-white transition-colors duration-300">
                Rick & Morty
              </h2>
              
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-medium">
                Buscador interdimensional con filtros client-side (CSR). Datos pre-renderizados e ISR dinámico de 10 días para los detalles de expedientes.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#42f5b3]/20 pt-5">
              <span className="font-mono text-xs font-bold text-[#42f5b3]/85 uppercase tracking-[0.2em] group-hover:text-[#42f5b3] transition-colors">
                Abrir Portal Transdimensional
              </span>
              <span className="font-mono text-base font-bold text-[#42f5b3] transition-all group-hover:translate-x-2">
                →
              </span>
            </div>
          </Link>
        </div>

        {/* Console logs ticker */}
        <div className="w-full max-w-xl rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 font-mono text-[10px] text-slate-500 flex items-center gap-2.5 backdrop-blur-sm">
          <IoTerminalOutline className="text-slate-400 animate-pulse" size={14} />
          <span className="truncate">Sistemas inicializados: cargando Kanto Pokédex Gen 1 & Ciudadela de Ricks ID Base...</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-black/40 py-6 text-center text-[10px] tracking-widest text-slate-500 uppercase">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          <p>© 2026 Desarrollo Web Avanzado</p>
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
            <span>Docente: Ricardo Coello Palomino</span>
            <span className="text-slate-600">·</span>
            <span>Sección C-D</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

