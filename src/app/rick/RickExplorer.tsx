"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Character, CharacterListResponse } from "../../types/rickandmorty";
import {
  IoSearchOutline,
  IoCloseCircleOutline,
  IoFilterOutline,
  IoSparklesOutline,
  IoRadioOutline,
  IoTerminalOutline,
} from "react-icons/io5";
import RenderBadge from "@/components/RenderBadge";
import CharacterDetailClient from "./[id]/CharacterDetailClient";

interface RickExplorerProps {
  initialCharacters: Character[];
}

function CharacterSkeleton() {
  return (
    <div className="rick-card overflow-hidden border border-[#42f5b3]/25 bg-black/60">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-2/3 rounded bg-white/5" />
        <div className="skeleton h-3 w-full rounded bg-white/5" />
        <div className="skeleton h-3 w-1/2 rounded bg-white/5" />
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#42f5b3]/30 bg-black/80 py-2.5 px-3 text-xs text-white placeholder:text-slate-600 focus:border-[#42f5b3] focus:outline-none focus:ring-2 focus:ring-[#42f5b3]/30 font-mono tracking-wide transition-all";

const citadelMessages = [
  "C-137: Space Cruiser listo. Combustible al 94%.",
  "ALERTA: Agentes de la Federación detectados en el Sector 4G.",
  "CIUDADELA: Consejo de Ricks en sesión permanente.",
  "TRANSMISIÓN: ¡Wubba Lubba Dub Dub! - Rick C-137",
  "AVISO: Nivel de fluido de portal estable en 88.2%",
  "DIMENSIÓN 35-C: Mega-semillas listas para su recolección.",
  "NODO JERRY: Interferencia patética detectada en sector residencial.",
  "ERROR 404: Dimensión de origen no encontrada en base de datos.",
  "PORTAL: Salto interdimensional verificado. Sin distorsión temporal.",
  "ALERTA GROMFLOMITA: Cuarentena de microverso activa.",
];

export default function RickExplorer({ initialCharacters }: RickExplorerProps) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCharacterDetail = async (id: number) => {
    setLoadingDetail(true);
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!res.ok) throw new Error("Character not found");
      const charData = await res.json();
      setSelectedCharacter(charData);
    } catch (err) {
      console.error("Error fetching character details", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleOpenCharacter = (id: number) => {
    setIsModalOpen(true);
    fetchCharacterDetail(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const hasFilters = !!(name || status || type || gender);
  const characters = hasFilters ? searchResults : initialCharacters;
  const displayError = hasFilters ? errorMsg : "";

  // Ticker animation
  useEffect(() => {
    const t = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % citadelMessages.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  // Debounced search logic
  useEffect(() => {
    if (!hasFilters) return;

    const t = setTimeout(async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const q = new URLSearchParams();
        if (name) q.append("name", name);
        if (status) q.append("status", status);
        if (type) q.append("type", type);
        if (gender) q.append("gender", gender);

        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?${q.toString()}`
        );
        if (!res.ok) {
          if (res.status === 404) {
            setSearchResults([]);
            setErrorMsg("Ninguna entidad detectada en esta dimensión con estos parámetros.");
            return;
          }
          throw new Error("Error");
        }
        const data: CharacterListResponse = await res.json();
        setSearchResults(data.results || []);
      } catch {
        setErrorMsg("Fallo en la conexión subespacial. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(t);
  }, [name, status, type, gender, hasFilters]);

  const clearFilters = () => {
    setName("");
    setStatus("");
    setType("");
    setGender("");
    setErrorMsg("");
  };

  const statusDot = (s: string) => {
    switch (s.toLowerCase()) {
      case "alive":
        return "bg-[#42f5b3] shadow-[0_0_12px_rgba(66,245,179,0.9)]";
      case "dead":
        return "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]";
      default:
        return "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]";
    }
  };

  const statusCardGlow = (s: string) => {
    switch (s.toLowerCase()) {
      case "alive":
        return "hover:border-[#42f5b3] hover:shadow-[0_0_24px_rgba(66,245,179,0.25)]";
      case "dead":
        return "hover:border-red-500 hover:shadow-[0_0_24px_rgba(239,68,68,0.25)]";
      default:
        return "hover:border-amber-400 hover:shadow-[0_0_24px_rgba(251,191,36,0.25)]";
    }
  };

  // Dimensional Warp Jump
  const handleRandomWarp = () => {
    setIsWarping(true);
    // Total character count is 826
    const randomId = Math.floor(Math.random() * 826) + 1;
    setTimeout(() => {
      setIsWarping(false);
      handleOpenCharacter(randomId);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      
      {/* Visual Warp Loader Overlay */}
      {isWarping && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
          <div className="relative h-64 w-64 md:h-80 md:w-80 animate-portal-spin flex items-center justify-center">
            {/* Toxic Portal Swirl */}
            <div className="absolute inset-0 rounded-full border-8 border-dashed border-[#42f5b3] opacity-60 scale-95" />
            <div className="absolute inset-2 rounded-full border-4 border-[#97ce4c] opacity-80 scale-105 animate-pulse" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#42f5b3] via-[#97ce4c] to-black opacity-90 blur-lg" />
          </div>
          <div className="mt-8 text-center space-y-2 relative z-10">
            <h3 className="font-display text-2.5xl font-black text-[#42f5b3] animate-pulse uppercase tracking-[0.2em]">
              Saltando Dimensión
            </h3>
            <p className="font-mono text-xs text-slate-400">
              Desestabilizando continuo espacio-temporal...
            </p>
          </div>
        </div>
      )}

      {/* Futuristic Portal Dashboard Header */}
      <header className="mb-8 relative">
        <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-[#42f5b3]/10 blur-3xl animate-portal" />
        
        <p className="font-mono text-xs font-black uppercase tracking-[0.25em] text-[#42f5b3] flex items-center gap-2">
          <IoRadioOutline className="animate-pulse" size={14} />
          Terminal de Control Multiversal · Citadel v1.0
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-b border-[#42f5b3]/25 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-black text-[#97ce4c] md:text-5.5xl tracking-tight">
              Base de Datos
            </h1>
            <RenderBadge mode="CSR" variant="rick" />
          </div>

          {/* Warp interactive trigger */}
          <button
            onClick={handleRandomWarp}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#42f5b3] bg-[#42f5b3]/10 px-5 py-2.5 font-mono text-xs font-black uppercase tracking-widest text-[#42f5b3] shadow-[0_0_15px_rgba(66,245,179,0.2)] transition hover:bg-[#42f5b3] hover:text-black hover:shadow-[0_0_25px_rgba(66,245,179,0.5)] active:scale-95"
          >
            <IoSparklesOutline className="animate-spin" size={14} />
            Warp Aleatorio
          </button>
        </div>
      </header>

      {/* Cyber Panel Filtros */}
      <div className="rick-terminal-container mb-8 rounded-2xl p-5 scanlines">
        <div className="mb-4 flex items-center justify-between border-b border-[#42f5b3]/20 pb-3 relative z-10">
          <div className="flex items-center gap-2 text-[#42f5b3] font-mono text-xs font-black tracking-widest">
            <IoFilterOutline size={16} />
            <span>CRITERIOS DE FILTRADO</span>
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex cursor-pointer items-center gap-1 font-mono text-[10px] font-black text-red-400 hover:text-red-300 transition-colors uppercase"
            >
              <IoCloseCircleOutline size={14} /> Resetear Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
          <div>
            <label className="mb-1 block font-mono text-[9px] font-black tracking-wider text-[#97ce4c] uppercase">
              Identidad
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Rick, Morty, Jerry..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputClass} pl-8`}
              />
              <IoSearchOutline
                className="absolute left-2.5 top-[0.7rem] text-[#42f5b3]/60"
                size={14}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-[9px] font-black tracking-wider text-[#97ce4c] uppercase">
              Estado Vital
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" className="bg-black text-white">Todos</option>
              <option value="alive" className="bg-black text-[#42f5b3]">Vivo</option>
              <option value="dead" className="bg-black text-red-500">Muerto</option>
              <option value="unknown" className="bg-black text-amber-400">Desconocido</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-mono text-[9px] font-black tracking-wider text-[#97ce4c] uppercase">
              Subespecie / Tipo
            </label>
            <input
              type="text"
              placeholder="Clon, Parásito..."
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-[9px] font-black tracking-wider text-[#97ce4c] uppercase">
              Género
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" className="bg-black text-white">Todos</option>
              <option value="female" className="bg-black text-white">Femenino</option>
              <option value="male" className="bg-black text-white">Masculino</option>
              <option value="genderless" className="bg-black text-white">Sin género</option>
              <option value="unknown" className="bg-black text-white">Desconocido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Results Header */}
      {!loading && !displayError && (
        <p className="mb-5 font-mono text-xs font-black uppercase text-[#97ce4c] tracking-widest">
          ⚡ Escaneo completo: [{characters.length}] especímenes detectados
        </p>
      )}

      {/* Skeletons Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CharacterSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error / Empty state */}
      {!loading && displayError && (
        <div className="rounded-2xl border border-dashed border-[#42f5b3]/30 py-20 text-center bg-black/40">
          <p className="font-mono text-sm text-[#42f5b3] tracking-wide px-4">{displayError}</p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-5 cursor-pointer font-mono text-xs font-black uppercase tracking-widest text-[#97ce4c] underline hover:text-white transition-colors"
            >
              Reiniciar Coordenadas de Portal
            </button>
          )}
        </div>
      )}

      {/* Hologram Card Grid */}
      {!loading && !displayError && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <button
              key={character.id}
              type="button"
              onClick={() => handleOpenCharacter(character.id)}
              className="text-left w-full cursor-pointer block"
            >
              <article className={`rick-card group overflow-hidden ${statusCardGlow(character.status)}`}>
                <div className="relative aspect-square overflow-hidden scanlines">
                  <Image
                    fill
                    src={character.image}
                    alt={character.name}
                    className="object-cover opacity-85 transition duration-500 group-hover:scale-108 group-hover:opacity-100 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {/* Hologram CRT overlay lines */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-1" />
                  
                  {/* Glowing Vitality Ribbon on image */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/85 border border-[#42f5b3]/30 px-3 py-1 backdrop-blur-sm">
                    <span className={`h-2.5 w-2.5 rounded-full ${statusDot(character.status)}`} />
                    <span className="font-mono text-[8px] font-black uppercase tracking-wider text-slate-300">
                      {character.status}
                    </span>
                  </div>

                  {/* Character Info footer card */}
                  <div className="absolute bottom-0 left-0 right-0 border-t border-[#42f5b3]/20 bg-black/85 p-3.5 backdrop-blur-sm z-10">
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
                      {character.species}
                    </span>
                    <h3 className="font-display truncate text-xl font-black text-white group-hover:text-[#42f5b3] transition-colors leading-tight">
                      {character.name}
                    </h3>
                  </div>
                </div>
                
                {/* Secondary details card footer */}
                <div className="bg-black/90 p-3 flex flex-col gap-1 border-t border-white/5 font-mono text-[10px] text-slate-400">
                  <p className="truncate">
                    <span className="text-slate-600 font-bold">ORIGEN:</span> {character.origin.name}
                  </p>
                  <p className="truncate">
                    <span className="text-slate-600 font-bold">LOC:</span> {character.location.name}
                  </p>
                </div>
              </article>
            </button>
          ))}
        </div>
      )}

      {/* Floating Citadel Terminal Transmission Log Ticker */}
      <div className="terminal-ticker mt-12 rounded-xl p-3 flex items-center justify-between gap-3 text-[#42f5b3]">
        <div className="flex items-center gap-2 font-mono text-[10px] font-black tracking-widest uppercase">
          <IoTerminalOutline className="animate-pulse" size={14} />
          <span>Multiverse Log:</span>
        </div>
        <p className="flex-1 font-mono text-[10px] text-[#42f5b3]/85 text-center truncate italic">
          &gt;&gt; {citadelMessages[tickerIndex]}
        </p>
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      {/* Modal interactivo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8">
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-2 md:-right-6 md:top-0 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#42f5b3] bg-black text-[#42f5b3] shadow-[0_0_15px_rgba(66,245,179,0.3)] hover:bg-[#42f5b3] hover:text-black active:scale-95 transition"
            >
              ✕
            </button>

            {loadingDetail ? (
              <div className="rick-card overflow-hidden border border-[#42f5b3] bg-black/90 p-8 min-h-[400px] flex flex-col items-center justify-center scanlines">
                <div className="relative h-40 w-40 animate-portal-spin flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#42f5b3] opacity-60 scale-95" />
                  <div className="absolute inset-2 rounded-full border-2 border-[#97ce4c] opacity-80 scale-105 animate-pulse" />
                  <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#42f5b3] via-[#97ce4c] to-black opacity-90 blur-lg" />
                </div>
                <h3 className="mt-8 font-mono text-base font-black uppercase tracking-[0.2em] text-[#42f5b3] animate-pulse">
                  Estableciendo Enlace Subespacial...
                </h3>
                <p className="font-mono text-[10px] text-slate-500 mt-2">
                  Cargando expediente holográfico de la Ciudadela...
                </p>
              </div>
            ) : (
              selectedCharacter && (
                <div className="theme-rick">
                  <CharacterDetailClient
                    character={selectedCharacter}
                    onClose={handleCloseModal}
                    onWarp={fetchCharacterDetail}
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
