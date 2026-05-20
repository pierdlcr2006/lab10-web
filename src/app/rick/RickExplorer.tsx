"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Character, CharacterListResponse } from "../../types/rickandmorty";
import {
  IoSearchOutline,
  IoCloseCircleOutline,
  IoFilterOutline,
} from "react-icons/io5";
import RenderBadge from "@/components/RenderBadge";

interface RickExplorerProps {
  initialCharacters: Character[];
}

function CharacterSkeleton() {
  return (
    <div className="rick-card overflow-hidden">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-3 w-full rounded" />
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#42f5b3]/30 bg-black py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#42f5b3] focus:outline-none focus:ring-2 focus:ring-[#42f5b3]/40";

export default function RickExplorer({ initialCharacters }: RickExplorerProps) {
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hasFilters = !!(name || status || type || gender);
  const characters = hasFilters ? searchResults : initialCharacters;
  const displayError = hasFilters ? errorMsg : "";

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
            setErrorMsg("Ningún personaje en esta dimensión.");
            return;
          }
          throw new Error("Error");
        }
        const data: CharacterListResponse = await res.json();
        setSearchResults(data.results || []);
      } catch {
        setErrorMsg("Error al buscar personajes.");
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
        return "bg-[#42f5b3] shadow-[0_0_10px_#42f5b3]";
      case "dead":
        return "bg-red-500 shadow-[0_0_10px_#ef4444]";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <header className="mb-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#42f5b3]">
          Multiverso · API Explorer
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-black text-[#97ce4c] md:text-5xl">
            Personajes
          </h1>
          <RenderBadge mode="CSR" variant="rick" />
        </div>
        <p className="mt-2 max-w-xl text-slate-400">
          Filtra en tiempo real. Datos iniciales desde caché (SSG).
        </p>
      </header>

      {/* Panel filtros — estilo terminal */}
      <div className="mb-8 rounded-xl border border-[#42f5b3]/40 bg-black/80 p-5 shadow-[0_0_30px_rgba(66,245,179,0.08)]">
        <div className="mb-4 flex items-center justify-between border-b border-[#42f5b3]/20 pb-3">
          <div className="flex items-center gap-2 text-[#42f5b3]">
            <IoFilterOutline size={18} />
            <span className="font-mono text-sm font-bold">FILTROS</span>
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex cursor-pointer items-center gap-1 font-mono text-xs text-red-400 hover:text-red-300"
            >
              <IoCloseCircleOutline size={14} /> RESET
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <label className="mb-1 block font-mono text-[10px] text-[#97ce4c]">
              NOMBRE
            </label>
            <input
              type="text"
              placeholder="Rick, Morty..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputClass} pl-9`}
            />
            <IoSearchOutline
              className="absolute left-3 top-[1.85rem] text-[#42f5b3]/60"
              size={16}
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[10px] text-[#97ce4c]">
              ESTADO
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">?</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-[10px] text-[#97ce4c]">
              TIPO
            </label>
            <input
              type="text"
              placeholder="Parasite..."
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[10px] text-[#97ce4c]">
              GÉNERO
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Todos</option>
              <option value="female">Femenino</option>
              <option value="male">Masculino</option>
              <option value="genderless">—</option>
              <option value="unknown">?</option>
            </select>
          </div>
        </div>
      </div>

      {!loading && !displayError && (
        <p className="mb-4 font-mono text-sm text-[#97ce4c]">
          [{characters.length}] resultados
        </p>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CharacterSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && displayError && (
        <div className="rounded-xl border border-dashed border-[#42f5b3]/30 py-16 text-center">
          <p className="font-mono text-[#42f5b3]">{displayError}</p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 cursor-pointer font-mono text-sm text-[#97ce4c] underline"
            >
              Restablecer
            </button>
          )}
        </div>
      )}

      {!loading && !displayError && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <Link key={character.id} href={`/rick/${character.id}`}>
              <article className="rick-card group overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    fill
                    src={character.image}
                    alt={character.name}
                    className="object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 border-t border-[#42f5b3]/30 bg-black/80 p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${statusDot(character.status)}`}
                      />
                      <span className="font-mono text-[10px] uppercase text-slate-400">
                        {character.status}
                      </span>
                    </div>
                    <h3 className="font-display truncate text-lg font-black text-white group-hover:text-[#42f5b3]">
                      {character.name}
                    </h3>
                  </div>
                </div>
                <p className="truncate px-3 py-2 font-mono text-xs text-slate-500">
                  📍 {character.location.name}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
