import { PokemonListResponse, SimplePokemon } from "../../types/pokemon";
import RenderBadge from "@/components/RenderBadge";
import PokemonExplorer from "./PokemonExplorer";

async function getPokemons(): Promise<SimplePokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Error al cargar pokémon");
  const data: PokemonListResponse = await res.json();
  return data.results.map((pokemon, index) => ({
    name: pokemon.name,
    id: index + 1,
  }));
}

export default async function PokemonList() {
  const pokemons = await getPokemons();

  return (
    <div className="px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Cabecera estilo Consola Pokédex Físico */}
        <header className="mb-8 overflow-hidden rounded-2xl border-4 border-black bg-[#e3350d] shadow-[8px_8px_0_#000] md:mb-12">
          {/* Fila de Luces de la Consola */}
          <div className="border-b-4 border-black bg-stone-900 px-5 py-3.5 flex items-center justify-between">
            {/* Ojo del Sensor Azul Grande */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full border-4 border-white bg-[#29b6f6] shadow-[0_0_15px_#29b6f6,inset_2px_2px_4px_rgba(255,255,255,0.7)] animate-pulse">
                <span className="absolute top-1.5 left-1.5 h-3.5 w-3.5 rounded-full bg-white opacity-85" />
              </div>
              <div className="flex gap-1.5">
                <span className="h-4.5 w-4.5 rounded-full border-2 border-black bg-red-600 animate-led-fast" />
                <span className="h-4.5 w-4.5 rounded-full border-2 border-black bg-yellow-400 animate-led-slow" />
                <span className="h-4.5 w-4.5 rounded-full border-2 border-black bg-emerald-500" />
              </div>
            </div>
            {/* Screen detail indicator */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] font-black text-stone-400 uppercase tracking-widest">
              <span>System: Online</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-[#f8f4e8] p-5 text-black md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#e3350d]">
                Región Kanto · GEN 1 · DB-151
              </p>
              <h1 className="font-display mt-1 text-3xl font-black uppercase tracking-tight md:text-4.5xl">
                Pokédex Nacional
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Retro metal grid style for render mode badge wrapper */}
              <div className="rounded-lg border-2 border-black bg-[#97ce4c]/20 p-1 flex items-center justify-center">
                <RenderBadge mode="ISR" detail="24h" variant="pokemon" />
              </div>
            </div>
          </div>
        </header>

        {/* Módulo Principal Cliente */}
        <PokemonExplorer pokemons={pokemons} />
      </div>
    </div>
  );
}

