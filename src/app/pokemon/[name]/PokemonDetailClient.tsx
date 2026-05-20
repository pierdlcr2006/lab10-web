"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "../../../types/pokemon";
import {
  IoSparklesOutline,
  IoVolumeHighOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoGameControllerOutline,
} from "react-icons/io5";
import { typeColors } from "../PokemonExplorer";

interface PokemonDetailClientProps {
  pokemon: Pokemon;
  description: string;
  prevName: string | null;
  nextName: string | null;
  onClose?: () => void;
  onNavigate?: (targetName: string) => void;
}

export default function PokemonDetailClient({
  pokemon,
  description,
  prevName,
  nextName,
  onClose,
  onNavigate,
}: PokemonDetailClientProps) {
  const [isShiny, setIsShiny] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "about" | "moves">("stats");
  const [isPlayingCry, setIsPlayingCry] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pokemon details
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const primaryColor = typeColors[primaryType] || "bg-stone-500";

  // Artwork selection
  const artwork = isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`
    : (pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default);

  // Play Cry sound
  const handlePlayCry = () => {
    if (!audioRef.current) {
      // PokeAPI latest official cries endpoint
      audioRef.current = new Audio(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/cries/${pokemon.id}.ogg`);
      audioRef.current.volume = 0.5;
      audioRef.current.onended = () => setIsPlayingCry(false);
      audioRef.current.onerror = () => setIsPlayingCry(false);
    }
    
    setIsPlayingCry(true);
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      setIsPlayingCry(false);
    });
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Pokédex Outer physical container */}
      <div className="poke-casing rounded-3xl p-4 md:p-6 text-black">
        {/* Lights / LED Panel top */}
        <div className="mb-4 flex items-center justify-between border-b-4 border-black/40 pb-3">
          <div className="flex items-center gap-3">
            {/* Blinking Blue Lens */}
            <div className="relative h-12 w-12 rounded-full border-4 border-white bg-[#29b6f6] shadow-[0_0_12px_#29b6f6,inset_2px_2px_4px_rgba(255,255,255,0.7)] animate-pulse">
              <span className="absolute top-1.5 left-1.5 h-3 w-3 rounded-full bg-white opacity-85" />
            </div>
            {/* 3 mini status LEDs */}
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full border border-black bg-red-600 animate-led-fast" />
              <span className="h-3 w-3 rounded-full border border-black bg-yellow-400" />
              <span className="h-3 w-3 rounded-full border border-black bg-emerald-500 animate-led-slow" />
            </div>
          </div>
          {/* Brand/Model tag */}
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
            Nintendo · Pokédex Gen-I
          </span>
        </div>

        {/* LCD Screen housing */}
        <div className="rounded-xl border-4 border-black bg-stone-300 p-3 md:p-4 shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]">
          {/* LCD Screen Display */}
          <div className="poke-screen p-4 text-white">
            {/* Header in screen */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-xs font-black tracking-widest text-[#9edc9e]">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
              <div className="flex gap-1">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`rounded border border-black/30 px-2 py-[1px] text-[8px] font-black uppercase tracking-widest ${typeColors[t.type.name] || "bg-stone-500"}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Display screen body: two columns */}
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Left Column: Image, Audio, Shiny toggle */}
              <div className="flex flex-col items-center justify-center bg-black/35 rounded-lg border border-black/40 p-3 relative group">
                {artwork && (
                  <div className="relative h-44 w-44 flex items-center justify-center p-2">
                    <Image
                      width={180}
                      height={180}
                      src={artwork}
                      alt={pokemon.name}
                      className="h-auto max-h-full w-auto max-w-full object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                )}

                {/* Floating Shiny & Cry indicators inside image */}
                <div className="mt-2.5 flex items-center gap-2 w-full justify-between px-2">
                  {/* Cry trigger */}
                  <button
                    onClick={handlePlayCry}
                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded border border-[#9edc9e]/40 bg-black/60 px-3 py-1 font-mono text-[9px] font-black uppercase tracking-wider text-[#9edc9e] shadow-[1px_1px_0_#000] hover:bg-black/90 active:translate-y-[1px]"
                  >
                    <IoVolumeHighOutline size={14} className={isPlayingCry ? "animate-bounce" : ""} />
                    Grito
                  </button>

                  {/* Shiny trigger */}
                  <button
                    onClick={() => setIsShiny(!isShiny)}
                    className={`flex cursor-pointer items-center justify-center gap-1.5 rounded border px-3 py-1 font-mono text-[9px] font-black uppercase tracking-wider shadow-[1px_1px_0_#000] active:translate-y-[1px] ${
                      isShiny
                        ? "border-yellow-400 bg-yellow-400/20 text-yellow-400"
                        : "border-[#9edc9e]/40 bg-black/60 text-[#9edc9e] hover:bg-black/90"
                    }`}
                  >
                    <IoSparklesOutline size={12} className={isShiny ? "animate-spin" : ""} />
                    {isShiny ? "Shiny" : "Normal"}
                  </button>
                </div>

                {/* Sound wave overlay when playing cry */}
                {isPlayingCry && (
                  <div className="absolute top-2 left-2 flex gap-1 items-center bg-black/80 px-2 py-1 rounded border border-[#9edc9e]/30">
                    <div className="audio-bar" />
                    <div className="audio-bar" />
                    <div className="audio-bar" />
                    <div className="audio-bar" />
                    <span className="font-mono text-[8px] text-[#9edc9e] uppercase font-bold tracking-widest pl-1">Cry</span>
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Details Panel */}
              <div className="flex flex-col bg-black/25 rounded-lg border border-black/40 p-3 min-h-[220px]">
                {/* Pokemon Name */}
                <h1 className="font-display text-2.5xl font-black uppercase tracking-tight text-white capitalize border-b border-white/10 pb-1">
                  {pokemon.name}
                </h1>

                {/* Info Display Tabs Header */}
                <div className="mt-2.5 flex border-b border-white/10 pb-1.5 gap-1">
                  {(["stats", "about", "moves"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer rounded px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider transition-all ${
                        activeTab === tab
                          ? "bg-white text-black font-black"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab === "stats" ? "Stats" : tab === "about" ? "Info" : "Ataques"}
                    </button>
                  ))}
                </div>

                {/* Tab content bodies */}
                <div className="mt-2.5 flex-1 overflow-y-auto max-h-[160px] pr-1">
                  {/* Tab 1: Stats */}
                  {activeTab === "stats" && (
                    <div className="space-y-2">
                      {pokemon.stats.map((stat) => {
                        const pct = Math.min(100, (stat.base_stat / 255) * 100);
                        const isHigh = stat.base_stat > 90;
                        const barColor = isHigh ? "bg-amber-400" : primaryColor;
                        return (
                          <div key={stat.stat.name} className="text-xs">
                            <div className="mb-0.5 flex justify-between font-mono font-bold text-slate-300">
                              <span className="capitalize text-[10px] tracking-wide">
                                {stat.stat.name.replace("special-", "sp. ").replace("-", " ")}
                              </span>
                              <span className="text-[10px]">{stat.base_stat}</span>
                            </div>
                            <div className="h-2 rounded bg-black/50 border border-white/5 overflow-hidden">
                              <div
                                className={`h-full ${barColor} rounded transition-all duration-500`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tab 2: About / Espacial description */}
                  {activeTab === "about" && (
                    <div className="space-y-3">
                      <p className="font-sans text-xs italic leading-relaxed text-slate-200 border-l-2 border-[#9edc9e] pl-2 py-0.5">
                        "{description}"
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-black/20 p-2 rounded border border-white/5">
                          <span className="block text-[8px] text-slate-400 uppercase tracking-widest">Altura</span>
                          <span className="font-bold text-[13px] text-[#9edc9e]">{pokemon.height / 10} m</span>
                        </div>
                        <div className="bg-black/20 p-2 rounded border border-white/5">
                          <span className="block text-[8px] text-slate-400 uppercase tracking-widest">Peso</span>
                          <span className="font-bold text-[13px] text-[#9edc9e]">{pokemon.weight / 10} kg</span>
                        </div>
                        <div className="col-span-2 bg-black/20 p-2 rounded border border-white/5">
                          <span className="block text-[8px] text-slate-400 uppercase tracking-widest">Habilidades</span>
                          <span className="font-bold text-[11px] capitalize text-slate-200">
                            {pokemon.abilities
                              .map((a) => a.ability.name.replace("-", " "))
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Moves */}
                  {activeTab === "moves" && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {pokemon.moves && pokemon.moves.length > 0 ? (
                        pokemon.moves.slice(0, 16).map((moveObj: any) => (
                          <div
                            key={moveObj.move.name}
                            className="bg-black/35 rounded border border-white/5 px-2 py-1 text-center font-mono text-[9px] font-bold capitalize text-slate-300 truncate"
                          >
                            ⚡ {moveObj.move.name.replace("-", " ")}
                          </div>
                        ))
                      ) : (
                        <span className="text-xs font-mono text-slate-400">Sin movimientos catalogados.</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Console physical controls bottom panel */}
        <div className="mt-5 flex items-center justify-between border-t-4 border-black/40 pt-4 px-2">
          {/* Left console controller: Gameboy circular buttons */}
          <div className="flex gap-2.5">
            <div className="flex flex-col items-center">
              <button
                onClick={handlePlayCry}
                className="poke-btn-round h-9 w-9 rounded-full cursor-pointer flex items-center justify-center text-white"
              >
                <span className="text-[10px] font-black uppercase text-stone-300 font-mono">A</span>
              </button>
              <span className="mt-1 font-mono text-[8px] font-black uppercase text-white/70">Audio</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsShiny(!isShiny)}
                className="poke-btn-round h-9 w-9 rounded-full cursor-pointer flex items-center justify-center text-white"
              >
                <span className="text-[10px] font-black uppercase text-stone-300 font-mono">B</span>
              </button>
              <span className="mt-1 font-mono text-[8px] font-black uppercase text-white/70">Shiny</span>
            </div>
          </div>

          {/* D-Pad Console Cross (Interactive Navigation Links) */}
          <div className="flex items-center gap-1.5">
            {prevName ? (
              onNavigate ? (
                <button
                  onClick={() => onNavigate(prevName)}
                  className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-black bg-stone-900 px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#000] hover:bg-stone-800 active:translate-y-0.5 active:shadow-[0px_0px_0_#000]"
                >
                  <IoChevronBackOutline size={10} />
                  Anterior
                </button>
              ) : (
                <Link
                  href={`/pokemon/${prevName}`}
                  className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-black bg-stone-900 px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#000] hover:bg-stone-800 active:translate-y-0.5 active:shadow-[0px_0px_0_#000]"
                >
                  <IoChevronBackOutline size={10} />
                  Anterior
                </Link>
              )
            ) : (
              <span className="opacity-30 rounded-lg border-2 border-black/30 bg-stone-950 px-3 py-1.5 font-mono text-[9px] font-black uppercase text-stone-600">
                Inicio
              </span>
            )}

            <div className="h-6 w-1 bg-black/40 rounded-full" />

            {nextName ? (
              onNavigate ? (
                <button
                  onClick={() => onNavigate(nextName)}
                  className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-black bg-stone-900 px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#000] hover:bg-stone-800 active:translate-y-0.5 active:shadow-[0px_0px_0_#000]"
                >
                  Siguiente
                  <IoChevronForwardOutline size={10} />
                </button>
              ) : (
                <Link
                  href={`/pokemon/${nextName}`}
                  className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-black bg-stone-900 px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#000] hover:bg-stone-800 active:translate-y-0.5 active:shadow-[0px_0px_0_#000]"
                >
                  Siguiente
                  <IoChevronForwardOutline size={10} />
                </Link>
              )
            ) : (
              <span className="opacity-30 rounded-lg border-2 border-black/30 bg-stone-950 px-3 py-1.5 font-mono text-[9px] font-black uppercase text-stone-600">
                Fin
              </span>
            )}
          </div>
        </div>

        {/* Back Link to list */}
        <div className="mt-6 border-t-2 border-black/30 pt-4 flex justify-center">
          {onClose ? (
            <button
              onClick={onClose}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl border-4 border-black bg-[#f8f4e8] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-y-0.5 transition active:translate-y-0"
            >
              <IoGameControllerOutline size={16} />
              Cerrar Consola
            </button>
          ) : (
            <Link
              href="/pokemon"
              className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-[#f8f4e8] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-y-0.5 transition active:translate-y-0"
            >
              <IoGameControllerOutline size={16} />
              Volver al Catálogo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
