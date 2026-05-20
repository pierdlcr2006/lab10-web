"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Character, CharacterListResponse } from "../../types/rickandmorty";
import { IoSearchOutline, IoCloseCircleOutline, IoFilterOutline } from "react-icons/io5";

interface RickExplorerProps {
  initialCharacters: Character[];
}

export default function RickExplorer({ initialCharacters }: RickExplorerProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // CSR search query triggered on change of filters
  useEffect(() => {
    // Skip fetching on initial render if all filters are empty
    if (!name && !status && !type && !gender) {
      setCharacters(initialCharacters);
      setErrorMsg("");
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const queryParams = new URLSearchParams();
        if (name) queryParams.append("name", name);
        if (status) queryParams.append("status", status);
        if (type) queryParams.append("type", type);
        if (gender) queryParams.append("gender", gender);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`);
        if (!res.ok) {
          if (res.status === 404) {
            setCharacters([]);
            setErrorMsg("No se encontraron personajes con esos filtros.");
            return;
          }
          throw new Error("Error al obtener los personajes.");
        }

        const data: CharacterListResponse = await res.json();
        setCharacters(data.results || []);
      } catch (err) {
        console.error(err);
        setErrorMsg("Ocurrió un error al buscar personajes.");
      } finally {
        setLoading(false);
      }
    }, 400); // Debounce searches to avoid spamming the API

    return () => clearTimeout(delayDebounceFn);
  }, [name, status, type, gender, initialCharacters]);

  const clearFilters = () => {
    setName("");
    setStatus("");
    setType("");
    setGender("");
    setCharacters(initialCharacters);
    setErrorMsg("");
  };

  const getStatusColor = (charStatus: string) => {
    switch (charStatus.toLowerCase()) {
      case "alive":
        return "bg-green-500 shadow-green-500/50";
      case "dead":
        return "bg-red-500 shadow-red-500/50";
      default:
        return "bg-slate-500 shadow-slate-500/50";
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      
      {/* Header and subtitle */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight flex items-center justify-center md:justify-start gap-3">
          Personajes de <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">Rick & Morty</span>
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Explora y filtra en tiempo real los personajes del multiverso usando CSR (Client-Side Rendering) y datos iniciales en caché (SSG).
        </p>
      </div>

      {/* Filter panel */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-2">
          <IoFilterOutline className="text-emerald-400" size={20} />
          <h2 className="font-bold text-lg">Filtros de búsqueda</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Filter */}
          <div className="relative">
            <label className="text-xs text-slate-400 font-bold block mb-1 uppercase tracking-wide">Nombre</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Rick, Morty..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
              />
              <IoSearchOutline className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-xs text-slate-400 font-bold block mb-1 uppercase tracking-wide">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
            >
              <option value="">Todos los Estados</option>
              <option value="alive">Vivo (Alive)</option>
              <option value="dead">Muerto (Dead)</option>
              <option value="unknown">Desconocido (Unknown)</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-xs text-slate-400 font-bold block mb-1 uppercase tracking-wide">Tipo / Subespecie</label>
            <input
              type="text"
              placeholder="Ej. Parasite, Clone..."
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Gender Filter */}
          <div>
            <label className="text-xs text-slate-400 font-bold block mb-1 uppercase tracking-wide">Género</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
            >
              <option value="">Todos los Géneros</option>
              <option value="female">Femenino (Female)</option>
              <option value="male">Masculino (Male)</option>
              <option value="genderless">Sin género (Genderless)</option>
              <option value="unknown">Desconocido (Unknown)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(name || status || type || gender) && (
          <div className="flex justify-end pt-2">
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              <IoCloseCircleOutline size={16} /> Limpiar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
        </div>
      )}

      {/* Error message */}
      {!loading && errorMsg && (
        <div className="text-center py-20 bg-slate-900/40 border border-white/5 rounded-2xl">
          <p className="text-slate-400 text-lg">{errorMsg}</p>
        </div>
      )}

      {/* Grid characters list */}
      {!loading && !errorMsg && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rick/${character.id}`}
              className="group relative transform transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Glow portal green effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-300"></div>
              
              {/* Card wrapper */}
              <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-white/20 transition-all duration-300">
                
                {/* Character Image */}
                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                  <Image
                    fill
                    src={character.image}
                    alt={character.name}
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 25vw"
                    priority={false} // Lazy Loading enforced
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(character.status)}`}></span>
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                      {character.status} - {character.species}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-black tracking-tight leading-tight truncate group-hover:text-emerald-400 transition duration-300">
                    {character.name}
                  </h3>

                  <div className="text-xs text-slate-400 space-y-1 pt-1 border-t border-white/5">
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase font-bold">Última ubicación:</span>
                      <span className="truncate block font-medium text-slate-300">{character.location.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
