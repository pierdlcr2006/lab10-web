import Link from "next/link";
import { PokemonListResponse, SimplePokemon } from "../../types/pokemon"; 
import { IoMdList } from "react-icons/io";
import Image from "next/image";

async function getPokemons(): Promise<SimplePokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 }, // Revalida cada 24 horas
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
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white text-left mb-12 tracking-tight flex items-center gap-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <IoMdList className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" /> 
          <span>Lista de Pokémons <span className="text-sm font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 uppercase tracking-wider ml-4">ISR - 24h</span></span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pokemons.map((pokemon) => {
            const padId = pokemon.id.toString().padStart(3, "0");
            return (
              <Link
                key={pokemon.name}
                href={`/pokemon/${pokemon.name}`}
                className="group relative transform transition-all duration-300 hover:-translate-y-2"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition duration-300"></div>
                
                {/* Card Body */}
                <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 text-white rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col items-center">
                  <div className="relative w-36 h-36 flex items-center justify-center bg-slate-950/40 rounded-xl p-4 mb-4 border border-white/5 group-hover:bg-slate-950/60 transition-colors duration-300">
                    <Image
                      width={120}
                      height={120}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                      alt={pokemon.name}
                      className="w-28 h-28 object-contain transform group-hover:scale-110 transition-transform duration-300"
                      priority={false}
                    />
                  </div>
                  
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400">
                    #{padId}
                  </span>
                  <h2 className="text-xl font-bold text-center capitalize mt-1 group-hover:text-yellow-400 transition-colors duration-300">
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
