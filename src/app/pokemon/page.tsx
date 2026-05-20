import Link from "next/link";
import { PokemonListResponse, SimplePokemon } from "../../types/pokemon";
import Image from "next/image";
import RenderBadge from "@/components/RenderBadge";

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
    <div className="px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Cabecera estilo dispositivo Pokédex */}
        <header className="mb-8 overflow-hidden rounded-2xl border-4 border-black bg-[#e3350d] shadow-[6px_6px_0_#000] md:mb-10">
          <div className="flex flex-col gap-4 bg-[#f8f4e8] p-5 text-black md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#e3350d]">
                Región Kanto · Gen 1
              </p>
              <h1 className="font-display mt-1 text-3xl font-black uppercase md:text-4xl">
                Pokédex Nacional
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="poke-screen flex h-14 min-w-[120px] items-center justify-center px-4">
                <span className="font-mono text-2xl font-black text-[#9edc9e]">
                  {pokemons.length}
                </span>
              </div>
              <RenderBadge mode="ISR" detail="24h" variant="pokemon" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {pokemons.map((pokemon) => {
            const padId = pokemon.id.toString().padStart(3, "0");
            return (
              <Link
                key={pokemon.name}
                href={`/pokemon/${pokemon.name}`}
                className="poke-card group block transition-all duration-200"
              >
                <div className="border-b-4 border-black bg-[#e3350d] px-2 py-1 text-center">
                  <span className="font-mono text-xs font-black text-white">
                    #{padId}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3">
                  <div className="poke-screen mb-2 flex h-24 w-full items-center justify-center p-2 md:h-28">
                    <Image
                      width={96}
                      height={96}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                      alt={pokemon.name}
                      className="h-20 w-20 object-contain transition-transform group-hover:scale-110 md:h-24 md:w-24"
                    />
                  </div>
                  <h2 className="font-display text-center text-sm font-black capitalize md:text-base">
                    {pokemon.name}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
