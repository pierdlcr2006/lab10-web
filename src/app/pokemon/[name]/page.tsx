import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Pokemon, PokemonListResponse } from "../../../types/pokemon";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) notFound();
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!res.ok) return [];
  const data: PokemonListResponse = await res.json();
  return data.results.map((pokemon) => ({ name: pokemon.name }));
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  try {
    const pokemon = await getPokemon(name);
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`,
      description: `Información sobre ${pokemon.name}`,
    };
  } catch {
    return { title: "Pokémon" };
  }
}

const typeBar: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-600",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  dragon: "bg-indigo-600",
  dark: "bg-slate-700",
  fairy: "bg-pink-300",
  normal: "bg-stone-400",
  fighting: "bg-orange-700",
  flying: "bg-indigo-400",
  poison: "bg-purple-600",
  ground: "bg-amber-700",
  rock: "bg-amber-900",
  bug: "bg-lime-600",
  ghost: "bg-violet-700",
  steel: "bg-slate-500",
};

export default async function PokemonDetail({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const barColor = typeBar[primaryType] || "bg-stone-500";

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-3xl">
        <article className="overflow-hidden rounded-2xl border-4 border-black bg-[#f8f4e8] text-black shadow-[8px_8px_0_#000]">
          {/* Cabecera roja Pokédex */}
          <div className="border-b-4 border-black bg-[#e3350d] px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-black">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
              <div className="flex gap-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`rounded-md border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${typeBar[t.type.name] || "bg-stone-500"} text-white`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="font-display mt-2 text-4xl font-black capitalize md:text-5xl">
              {pokemon.name}
            </h1>
          </div>

          {/* Imagen en pantalla verde */}
          <div className="border-b-4 border-black p-6">
            <div className="poke-screen mx-auto flex max-w-xs items-center justify-center p-6">
              {artwork && (
                <Image
                  width={280}
                  height={280}
                  src={artwork}
                  alt={pokemon.name}
                  className="h-auto w-full object-contain drop-shadow-lg"
                  priority
                />
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4 p-5 md:p-6">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-[#e3350d]">
              Estadísticas
            </h3>
            {pokemon.stats.map((stat) => {
              const pct = Math.min(100, (stat.base_stat / 255) * 100);
              return (
                <div key={stat.stat.name}>
                  <div className="mb-1 flex justify-between text-sm font-bold">
                    <span className="capitalize">
                      {stat.stat.name.replace("-", " ")}
                    </span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full border-2 border-black bg-stone-200">
                    <div
                      className={`h-full ${barColor} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info extra */}
          <div className="grid grid-cols-2 gap-3 border-t-4 border-black bg-stone-100 p-5 md:grid-cols-3">
            <div className="rounded-lg border-2 border-black bg-white p-3">
              <p className="text-xs font-bold text-stone-500">ALTURA</p>
              <p className="font-display text-xl font-black">
                {pokemon.height / 10} m
              </p>
            </div>
            <div className="rounded-lg border-2 border-black bg-white p-3">
              <p className="text-xs font-bold text-stone-500">PESO</p>
              <p className="font-display text-xl font-black">
                {pokemon.weight / 10} kg
              </p>
            </div>
            <div className="col-span-2 rounded-lg border-2 border-black bg-white p-3 md:col-span-1">
              <p className="text-xs font-bold text-stone-500">HABILIDADES</p>
              <p className="text-sm font-bold capitalize">
                {pokemon.abilities
                  .map((a) => a.ability.name.replace("-", " "))
                  .join(", ")}
              </p>
            </div>
          </div>

          <div className="border-t-4 border-black bg-[#e3350d] p-4">
            <Link
              href="/pokemon"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[#f8f4e8] px-5 py-2.5 text-sm font-black text-black shadow-[3px_3px_0_#000] transition hover:shadow-[5px_5px_0_#000] hover:-translate-y-0.5"
            >
              ← Volver al Pokédex
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
