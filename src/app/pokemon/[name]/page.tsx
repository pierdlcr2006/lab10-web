import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pokemon, PokemonListResponse } from "../../../types/pokemon";
import PokemonDetailClient from "./PokemonDetailClient";

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

async function getPokemonDescription(id: number): Promise<string> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return "No hay descripción disponible para esta especie.";
    const data = await res.json();
    const spanishEntry = data.flavor_text_entries.find(
      (entry: any) => entry.language.name === "es"
    );
    if (spanishEntry) {
      return spanishEntry.flavor_text.replace(/\f/g, " ");
    }
    const englishEntry = data.flavor_text_entries.find(
      (entry: any) => entry.language.name === "en"
    );
    return englishEntry
      ? englishEntry.flavor_text.replace(/\f/g, " ")
      : "No hay descripción disponible.";
  } catch {
    return "Error al conectar con la base de datos de especies Pokémon.";
  }
}

async function getPrevAndNextNames(id: number) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return { prev: null, next: null };
    const data: PokemonListResponse = await res.json();
    const results = data.results;
    const prev = id > 1 ? results[id - 2]?.name : null;
    const next = id < 151 ? results[id]?.name : null;
    return { prev, next };
  } catch {
    return { prev: null, next: null };
  }
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
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokédex`,
      description: `Información detallada sobre ${pokemon.name} en el Pokédex de Kanto`,
    };
  } catch {
    return { title: "Pokémon" };
  }
}

export default async function PokemonDetail({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const description = await getPokemonDescription(pokemon.id);
  const { prev, next } = await getPrevAndNextNames(pokemon.id);

  // Extend fields for moves compatibility (types.ts is limited, but PokeAPI delivers full moves)
  const fullPokemon = pokemon as any;

  return (
    <div className="px-4 py-8 md:px-6 md:py-10 theme-pokemon min-h-screen">
      <PokemonDetailClient
        pokemon={fullPokemon}
        description={description}
        prevName={prev}
        nextName={next}
      />
    </div>
  );
}

