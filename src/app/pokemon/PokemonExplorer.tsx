"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SimplePokemon, Pokemon } from "../../types/pokemon";
import { IoSearchOutline, IoCloseCircleOutline, IoSparklesOutline } from "react-icons/io5";
import PokemonDetailClient from "./[name]/PokemonDetailClient";

interface PokemonExplorerProps {
  pokemons: SimplePokemon[];
}

export function getPokemonPrimaryType(id: number): string {
  if ([1, 2, 3, 43, 44, 45, 69, 70, 71, 102, 103, 114].includes(id)) return "grass";
  if ([4, 5, 6, 37, 38, 58, 59, 77, 78, 126, 136, 146].includes(id)) return "fire";
  if ([7, 8, 9, 54, 55, 60, 61, 62, 72, 73, 79, 80, 86, 87, 90, 91, 98, 99, 116, 117, 118, 119, 120, 121, 129, 130, 131, 134].includes(id)) return "water";
  if ([10, 11, 12, 13, 14, 15, 46, 47, 48, 49, 123, 127].includes(id)) return "bug";
  if ([16, 17, 18, 19, 20, 21, 22, 39, 40, 52, 53, 83, 84, 85, 108, 113, 115, 128, 132, 133, 137, 143].includes(id)) return "normal";
  if ([23, 24, 29, 30, 31, 32, 33, 34, 41, 42, 88, 89, 109, 110].includes(id)) return "poison";
  if ([25, 26, 81, 82, 100, 101, 125, 135, 145].includes(id)) return "electric";
  if ([27, 28, 50, 51, 104, 105, 111, 112].includes(id)) return "ground";
  if ([35, 36].includes(id)) return "fairy";
  if ([56, 57, 66, 67, 68, 106, 107].includes(id)) return "fighting";
  if ([63, 64, 65, 96, 97, 122, 150, 151].includes(id)) return "psychic";
  if ([74, 75, 76, 95, 138, 139, 140, 141, 142].includes(id)) return "rock";
  if ([92, 93, 94].includes(id)) return "ghost";
  if ([124, 144].includes(id)) return "ice";
  if ([147, 148, 149].includes(id)) return "dragon";
  return "normal";
}

export const typeColors: Record<string, string> = {
  grass: "bg-emerald-600 text-white border-emerald-950",
  fire: "bg-red-500 text-white border-red-950",
  water: "bg-blue-500 text-white border-blue-950",
  bug: "bg-lime-600 text-white border-lime-950",
  normal: "bg-stone-400 text-white border-stone-600",
  poison: "bg-purple-600 text-white border-purple-950",
  electric: "bg-yellow-400 text-black border-yellow-700",
  ground: "bg-amber-700 text-white border-amber-950",
  fairy: "bg-pink-300 text-black border-pink-700",
  fighting: "bg-orange-700 text-white border-orange-950",
  psychic: "bg-pink-500 text-white border-pink-950",
  rock: "bg-amber-900 text-white border-amber-950",
  ghost: "bg-violet-700 text-white border-violet-950",
  ice: "bg-cyan-400 text-black border-cyan-800",
  dragon: "bg-indigo-600 text-white border-indigo-950",
};

const pokemonTypes = [
  "Todos",
  "grass",
  "fire",
  "water",
  "bug",
  "normal",
  "poison",
  "electric",
  "ground",
  "fighting",
  "psychic",
  "rock",
  "ghost",
  "ice",
  "dragon",
];

export default function PokemonExplorer({ pokemons }: PokemonExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [description, setDescription] = useState("");
  const [prevName, setPrevName] = useState<string | null>(null);
  const [nextName, setNextName] = useState<string | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPokemonDetail = async (name: string) => {
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/pokemon/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("Pokemon not found");
      const { pokemon: pokemonData, description: desc } = await res.json();

      let prev: string | null = null;
      let next: string | null = null;
      if (pokemonData.id > 1) {
        const prevItem = pokemons.find((p) => p.id === pokemonData.id - 1);
        if (prevItem) prev = prevItem.name;
      }
      if (pokemonData.id < 151) {
        const nextItem = pokemons.find((p) => p.id === pokemonData.id + 1);
        if (nextItem) next = nextItem.name;
      }

      setSelectedPokemon(pokemonData);
      setDescription(desc);
      setPrevName(prev);
      setNextName(next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleOpenPokemon = (name: string) => {
    setIsModalOpen(true);
    fetchPokemonDetail(name);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const filtered = pokemons.filter((pokemon) => {
    const matchesSearch =
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString() === search;
    const primaryType = getPokemonPrimaryType(pokemon.id);
    const matchesType = selectedType === "Todos" || primaryType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Console Digital Screen Controls */}
      <div className="poke-card bg-stone-200 border-4 border-black p-5 shadow-[4px_4px_0_#000] text-black">
        <div className="mb-4 border-b-2 border-dashed border-stone-400 pb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-600 animate-led-fast border border-black" />
            <span className="font-mono text-xs font-black uppercase tracking-wider text-stone-700">
              Módulo de Búsqueda Pokédex
            </span>
          </div>
          {/* Active stats display */}
          <div className="font-mono text-xs font-black bg-stone-300 border border-stone-400 px-2 py-0.5 rounded">
            [{filtered.length}/151] POKÉMONS
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Search bar inside gameboy-like panel */}
          <div className="relative lg:col-span-1">
            <label className="mb-1 block font-mono text-[10px] font-black text-stone-700 uppercase tracking-widest">
              Identificar Pokémon:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre o Número..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-black bg-white px-3 py-2 pl-9 font-mono text-xs text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#e3350d]/20"
              />
              <IoSearchOutline
                className="absolute left-3 top-2.5 text-stone-600"
                size={16}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-black cursor-pointer"
                >
                  <IoCloseCircleOutline size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Quick type filter tabs */}
          <div className="lg:col-span-2">
            <label className="mb-1 block font-mono text-[10px] font-black text-stone-700 uppercase tracking-widest">
              Filtrar por Tipo Elemental:
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto border-2 border-stone-300 bg-stone-100 rounded-lg p-2">
              {pokemonTypes.map((type) => {
                const isSelected = selectedType === type;
                const badgeColor =
                  type === "Todos"
                    ? isSelected
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-stone-300"
                    : isSelected
                    ? `${typeColors[type]} border-2 border-black scale-95`
                    : `${typeColors[type]} opacity-60 hover:opacity-100 border border-stone-400`;

                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`cursor-pointer rounded px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider transition-all shadow-[1px_1px_0_#000] active:translate-y-0.5 active:shadow-[0px_0px_0_#000] border ${badgeColor}`}
                  >
                    {type === "Todos" ? "Todos" : type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Pokemon cards */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border-4 border-dashed border-[#e3350d]/40 py-16 text-center bg-[#f8f4e8]/5">
          <IoSparklesOutline className="mx-auto text-[#e3350d]/60 animate-bounce mb-3" size={32} />
          <p className="font-mono text-sm font-bold text-stone-400">
            Ningún Pokémon encontrado en la base de datos de Kanto.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedType("Todos");
            }}
            className="mt-4 cursor-pointer font-mono text-xs font-black uppercase rounded-lg border-2 border-black bg-[#e3350d] text-white px-4 py-2 hover:bg-[#ff4d2e] shadow-[3px_3px_0_#000]"
          >
            Reiniciar Escáner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((pokemon) => {
            const padId = pokemon.id.toString().padStart(3, "0");
            const primaryType = getPokemonPrimaryType(pokemon.id);
            const typeColor = typeColors[primaryType] || "bg-stone-400";
            
            return (
              <button
                key={pokemon.name}
                onClick={() => handleOpenPokemon(pokemon.name)}
                className="poke-card group text-left block transition-all w-full cursor-pointer"
              >
                {/* ID and type ribbon */}
                <div className="border-b-4 border-black bg-stone-800 px-2.5 py-1.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black text-white">
                    #{padId}
                  </span>
                  <span className={`rounded-sm border border-black/40 px-1.5 py-[1px] font-mono text-[8px] font-black uppercase tracking-widest ${typeColor}`}>
                    {primaryType}
                  </span>
                </div>
                
                <div className="flex flex-col items-center p-4">
                  {/* Digital screen effect for sprite */}
                  <div className="poke-screen mb-3 flex h-28 w-full items-center justify-center p-3 md:h-32">
                    <Image
                      width={96}
                      height={96}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                      alt={pokemon.name}
                      className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-115 group-hover:rotate-3 md:h-24 md:w-24 drop-shadow-md"
                    />
                  </div>
                  
                  {/* Name inside physical display box */}
                  <div className="w-full text-center">
                    <h2 className="font-display text-sm font-black capitalize tracking-wide md:text-base border-t-2 border-dashed border-stone-300 pt-2 group-hover:text-[#e3350d] transition-colors">
                      {pokemon.name}
                    </h2>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Modal interactivo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8">
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-2 md:-right-6 md:top-0 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-stone-900 text-white shadow-[2px_2px_0_#000] hover:bg-stone-800 active:translate-y-0.5"
            >
              ✕
            </button>

            {loadingDetail ? (
              <div className="poke-casing rounded-3xl p-6 text-black min-h-[400px] flex flex-col items-center justify-center">
                <div className="rounded-xl border-4 border-black bg-stone-300 p-8 shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] w-full text-center">
                  <div className="poke-screen p-8 text-white min-h-[250px] flex flex-col items-center justify-center space-y-4">
                    <span className="h-4 w-4 rounded-full bg-red-600 animate-ping border border-black mb-2" />
                    <h3 className="font-mono text-lg font-black uppercase tracking-widest text-[#9edc9e]">
                      Buscando en Base de Datos...
                    </h3>
                    <p className="font-mono text-xs text-slate-400">
                      Escaneando ondas electromagnéticas de Kanto...
                    </p>
                    <div className="w-full max-w-xs h-1 rounded bg-black/50 overflow-hidden mt-4">
                      <div className="h-full bg-[#9edc9e] rounded animate-pulse" style={{ width: "70%" }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              selectedPokemon && (
                <div className="theme-pokemon">
                  <PokemonDetailClient
                    pokemon={selectedPokemon}
                    description={description}
                    prevName={prevName}
                    nextName={nextName}
                    onClose={handleCloseModal}
                    onNavigate={fetchPokemonDetail}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
