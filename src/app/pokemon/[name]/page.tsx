import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Pokemon, PokemonListResponse } from "../../../types/pokemon";

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    {
      next: { revalidate: 86400 } // Revalida cada 24 horas (ISR)
    }
  );

  if (!res.ok) notFound();

  return res.json();
}

// Genera rutas estáticas para SSG
export async function generateStaticParams() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  if (!res.ok) return [];

  const data: PokemonListResponse = await res.json();

  return data.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

// Metadata dinámica
export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  try {
    const pokemon = await getPokemon(name);
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédex`,
      description: `Información sobre ${pokemon.name}`,
    };
  } catch {
    return {
      title: "Pokémon - Pokédex",
    };
  }
}

const typeColors: Record<string, string> = {
  fire: "bg-red-500 shadow-red-500/20 text-white",
  water: "bg-blue-500 shadow-blue-500/20 text-white",
  grass: "bg-green-500 shadow-green-500/20 text-white",
  electric: "bg-yellow-400 shadow-yellow-400/20 text-black",
  psychic: "bg-pink-500 shadow-pink-500/20 text-white",
  ice: "bg-cyan-400 shadow-cyan-400/20 text-black",
  dragon: "bg-indigo-600 shadow-indigo-600/20 text-white",
  dark: "bg-slate-800 shadow-slate-800/20 text-white",
  fairy: "bg-pink-300 shadow-pink-300/20 text-black",
  normal: "bg-slate-400 shadow-slate-400/20 text-white",
  fighting: "bg-orange-700 shadow-orange-700/20 text-white",
  flying: "bg-indigo-400 shadow-indigo-400/20 text-white",
  poison: "bg-purple-500 shadow-purple-500/20 text-white",
  ground: "bg-amber-600 shadow-amber-600/20 text-white",
  rock: "bg-amber-800 shadow-amber-800/20 text-white",
  bug: "bg-emerald-600 shadow-emerald-600/20 text-white",
  ghost: "bg-violet-700 shadow-violet-700/20 text-white",
  steel: "bg-slate-500 shadow-slate-500/20 text-white",
};

export default async function PokemonDetail({
  params,
}: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const cardHeaderClass = typeColors[primaryType] || "bg-slate-500 text-white";

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header section with primary type color background */}
        <div className={`relative px-8 py-12 flex flex-col items-center justify-center ${cardHeaderClass} bg-opacity-90 overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          <span className="relative z-10 text-lg font-mono font-bold tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-white/90 mb-3 border border-white/10">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
          <h1 className="relative z-10 text-5xl md:text-6xl font-black capitalize text-center tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
            {pokemon.name}
          </h1>
        </div>

        {/* Details section */}
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            {/* Left Column: Image */}
            <div className="flex-1 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="relative w-64 h-64 p-6 bg-slate-950/40 rounded-2xl border border-white/5 flex items-center justify-center shadow-inner group">
                <Image
                  width={250}
                  height={250}
                  src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Stats and Specs */}
            <div className="flex-1 w-full space-y-8">
              
              {/* Types */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-300 tracking-wide uppercase text-xs">
                  Tipos
                </h3>
                <div className="flex flex-wrap gap-3">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`${typeColors[type.type.name] || "bg-slate-600 text-white"} text-sm px-4 py-2 rounded-xl font-bold capitalize shadow-lg`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-slate-300 tracking-wide uppercase text-xs">
                  Estadísticas
                </h3>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-semibold text-slate-400">
                          {stat.stat.name.replace("-", " ")}
                        </span>
                        <span className="font-bold text-white">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="w-full bg-slate-850 rounded-full h-3 border border-white/5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-400 via-amber-500 to-purple-600 h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Info */}
              <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/5 space-y-3">
                <h3 className="text-sm font-bold text-slate-300 tracking-wide uppercase border-b border-white/5 pb-2 mb-2">
                  Información adicional
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs">Altura</span>
                    <strong className="text-white text-base">{pokemon.height / 10} m</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Peso</span>
                    <strong className="text-white text-base">{pokemon.weight / 10} kg</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-xs">Habilidades</span>
                    <strong className="text-white text-sm capitalize">
                      {pokemon.abilities.map((a) => a.ability.name.replace("-", " ")).join(", ")}
                    </strong>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Back Button Footer */}
        <div className="px-8 py-6 bg-slate-950/50 border-t border-white/5 flex justify-start">
          <Link
            href="/pokemon"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-xl transition duration-300 border border-white/5 shadow-lg"
          >
            ← Volver al Pokédex
          </Link>
        </div>

      </div>
    </div>
  );
}
