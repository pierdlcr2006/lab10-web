"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Character } from "../../../types/rickandmorty";
import {
  IoPlanetOutline,
  IoLocationOutline,
  IoFilmOutline,
  IoCalendarOutline,
  IoShieldOutline,
  IoKeyOutline,
  IoSparklesOutline,
  IoTerminalOutline,
} from "react-icons/io5";
import RenderBadge from "@/components/RenderBadge";

interface CharacterDetailClientProps {
  character: Character;
  onClose?: () => void;
  onWarp?: (id: number) => void;
}

export default function CharacterDetailClient({
  character,
  onClose,
  onWarp,
}: CharacterDetailClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"bio" | "episodes" | "citadel">("bio");
  const [isWarping, setIsWarping] = useState(false);

  const statusStyle = (s: string) => {
    switch (s.toLowerCase()) {
      case "alive":
        return "text-[#42f5b3] border-[#42f5b3]/50 bg-[#42f5b3]/10 shadow-[0_0_15px_rgba(66,245,179,0.2)]";
      case "dead":
        return "text-red-400 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
      default:
        return "text-amber-400 border-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.2)]";
    }
  };

  const statusBorderColor = (s: string) => {
    switch (s.toLowerCase()) {
      case "alive":
        return "border-[#42f5b3] shadow-[0_0_25px_rgba(66,245,179,0.35)]";
      case "dead":
        return "border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)]";
      default:
        return "border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)]";
    }
  };

  // Dimensional Warp Jump
  const handleRandomWarp = () => {
    setIsWarping(true);
    // Total character count is 826
    const randomId = Math.floor(Math.random() * 826) + 1;
    setTimeout(() => {
      if (onWarp) {
        onWarp(randomId);
      } else {
        router.push(`/rick/${randomId}`);
      }
      setIsWarping(false);
    }, 850);
  };

  // Citadel Database Threat Level Estimator
  const getThreatLevel = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("rick")) return { level: "ALTA (AMENAZA MULTIVERSAL EXTREMA)", color: "text-red-500 border-red-500/30 bg-red-500/5" };
    if (n.includes("morty")) return { level: "MODERADA (ELEMENTO INESTABLE/MANIPULABLE)", color: "text-amber-400 border-amber-400/30 bg-amber-400/5" };
    if (n.includes("jerry")) return { level: "CERO (ENTIDAD ABSOLUTAMENTE PATÉTICA)", color: "text-emerald-500 border-emerald-500/30 bg-emerald-500/5" };
    if (n.includes("summer") || n.includes("beth")) return { level: "BAJA (ELEMENTO COLATERAL CONTROLADO)", color: "text-blue-400 border-blue-400/30 bg-blue-400/5" };
    return { level: "PENDIENTE DE CLASIFICACIÓN TÁCTICA", color: "text-slate-400 border-slate-500/30 bg-slate-500/5" };
  };

  const threat = getThreatLevel(character.name);

  // Custom Dimcode Generation
  const dimCode = `E-${character.id * 17 + 100}-${["X","Y","Z","Alpha","Beta"][character.id % 5]}`;

  const date = new Date(character.created).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl">
      
      {/* Visual Warp Loader Overlay */}
      {isWarping && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
          <div className="relative h-64 w-64 md:h-80 md:w-80 animate-portal-spin flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-8 border-dashed border-[#42f5b3] opacity-60 scale-95" />
            <div className="absolute inset-2 rounded-full border-4 border-[#97ce4c] opacity-80 scale-105 animate-pulse" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#42f5b3] via-[#97ce4c] to-black opacity-90 blur-lg" />
          </div>
          <div className="mt-8 text-center space-y-2 relative z-10">
            <h3 className="font-display text-2.5xl font-black text-[#42f5b3] animate-pulse uppercase tracking-[0.2em]">
              Saltando Dimensión
            </h3>
            <p className="font-mono text-xs text-slate-400">
              Cargando coordenadas de portal...
            </p>
          </div>
        </div>
      )}

      {/* Profile Card Terminal */}
      <article className="overflow-hidden rounded-2xl border-2 border-[#42f5b3]/40 bg-black/90 shadow-[0_0_40px_rgba(66,245,179,0.15)] scanlines">
        {/* Terminal Header */}
        <div className="relative border-b border-[#42f5b3]/30 p-6 md:p-8">
          
          {/* Animated portal background widget */}
          <div className="pointer-events-none absolute right-4 top-4 h-32 w-32 rounded-full bg-[#42f5b3]/5 blur-2xl animate-portal" />
          <div className="absolute right-6 top-6 h-20 w-20 rounded-full border-2 border-dashed border-[#42f5b3]/30 animate-portal-spin hidden md:block" />

          <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Holograph image container */}
            <div className={`relative h-44 w-44 shrink-0 overflow-hidden rounded-xl border-2 bg-black/60 ${statusBorderColor(character.status)} md:h-48 md:w-48`}>
              <Image
                fill
                sizes="(max-width: 768px) 176px, 192px"
                src={character.image}
                alt={character.name}
                className="object-cover opacity-90 transition group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
            </div>

            {/* General Bio header */}
            <div className="text-center md:text-left flex-1 space-y-3">
              <div className="flex flex-wrap justify-center gap-2 md:justify-start items-center">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-0.5 rounded">
                  REG-ID: {character.id}
                </span>
                <RenderBadge mode="ISR" detail="10d" variant="rick" />
              </div>

              <h1 className="font-display text-3.5xl font-black text-[#97ce4c] md:text-5xl tracking-tight leading-tight filter drop-shadow-md">
                {character.name}
              </h1>

              <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                <span
                  className={`rounded-full border px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${statusStyle(character.status)}`}
                >
                  {character.status}
                </span>
                <span className="rounded-full border border-[#42f5b3]/30 bg-[#42f5b3]/5 px-3 py-0.5 font-mono text-xs text-[#42f5b3]">
                  {character.species}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 font-mono text-xs text-slate-300">
                  {character.gender}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-[#42f5b3]/25 bg-black/50 px-4 md:px-6">
          {([
            { id: "bio", label: "Expediente" },
            { id: "episodes", label: "Bitácora de Viajes" },
            { id: "citadel", label: "Alerta Ciudadela" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer border-b-2 py-3.5 px-4 font-mono text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "border-[#42f5b3] text-[#42f5b3]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Display Panel Body */}
        <div className="p-5 md:p-6 min-h-[220px]">
          
          {/* Tab 1: Bio Detail list */}
          {activeTab === "bio" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#42f5b3]/20 bg-black/75 p-4 flex items-start gap-3">
                <IoPlanetOutline className="text-[#42f5b3] mt-0.5" size={18} />
                <div>
                  <span className="block font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">Planeta Origen</span>
                  <span className="font-display font-bold text-[15px] text-white leading-tight mt-0.5 block">{character.origin.name}</span>
                </div>
              </div>
              
              <div className="rounded-lg border border-[#42f5b3]/20 bg-black/75 p-4 flex items-start gap-3">
                <IoLocationOutline className="text-[#42f5b3] mt-0.5" size={18} />
                <div>
                  <span className="block font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">Ubicación Actual</span>
                  <span className="font-display font-bold text-[15px] text-white leading-tight mt-0.5 block">{character.location.name}</span>
                </div>
              </div>

              <div className="rounded-lg border border-[#42f5b3]/20 bg-black/75 p-4 flex items-start gap-3">
                <IoFilmOutline className="text-[#42f5b3] mt-0.5" size={18} />
                <div>
                  <span className="block font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">Registro de Episodios</span>
                  <span className="font-display font-bold text-[15px] text-white leading-tight mt-0.5 block">{character.episode.length} aparición(es)</span>
                </div>
              </div>

              <div className="rounded-lg border border-[#42f5b3]/20 bg-black/75 p-4 flex items-start gap-3">
                <IoCalendarOutline className="text-[#42f5b3] mt-0.5" size={18} />
                <div>
                  <span className="block font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">Fecha Registro</span>
                  <span className="font-display font-bold text-[15px] text-white leading-tight mt-0.5 block">{date}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Encrypted Episodes Grid */}
          {activeTab === "episodes" && (
            <div className="space-y-3">
              <span className="block font-mono text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                &gt;&gt; Registro de Archivos Espacio-Temporales:
              </span>
              <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                {character.episode.map((epUrl, idx) => {
                  const epNumber = epUrl.split("/").pop();
                  return (
                    <div
                      key={epUrl}
                      className="rounded border border-[#42f5b3]/15 bg-black/80 px-3 py-2 flex items-center justify-between gap-2 font-mono text-[10px] text-slate-300"
                    >
                      <span className="truncate flex items-center gap-1.5 text-slate-400">
                        <IoTerminalOutline size={12} className="text-[#42f5b3]" />
                        Episodio #{epNumber}
                      </span>
                      <span className="text-[9px] bg-[#42f5b3]/10 text-[#42f5b3] px-1 rounded uppercase font-black">LOG-{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Citadel Threat Evaluator */}
          {activeTab === "citadel" && (
            <div className="space-y-4 font-mono text-xs">
              <div className="rounded-lg border border-red-950 bg-red-950/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <IoShieldOutline size={16} />
                  <span>ÍNDICE DE RIESGO DE LA CIUDADELA:</span>
                </div>
                <div className={`p-2.5 rounded border ${threat.color} font-black text-[12px] tracking-wide`}>
                  {threat.level}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-[#42f5b3]/20 bg-black/75 p-3 flex items-center gap-2.5">
                  <IoKeyOutline className="text-[#42f5b3]" size={16} />
                  <div>
                    <span className="block text-[8px] text-slate-500 uppercase font-black">CÓDIGO DE DIMENSIÓN</span>
                    <span className="font-bold text-white text-[12px] uppercase">{dimCode}</span>
                  </div>
                </div>

                <div className="rounded-lg border border-[#42f5b3]/20 bg-black/75 p-3 flex items-center gap-2.5">
                  <IoPlanetOutline className="text-[#42f5b3]" size={16} />
                  <div>
                    <span className="block text-[8px] text-slate-500 uppercase font-black">CLASIFICACIÓN DE MULTIVERSO</span>
                    <span className="font-bold text-white text-[12px] uppercase">Rango-{character.id % 7 + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Portal Warp Actions bottom bar */}
        <div className="border-t border-[#42f5b3]/25 bg-black/40 p-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {onClose ? (
            <button
              onClick={onClose}
              className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#42f5b3]/40 bg-black px-5 py-2.5 font-mono text-xs font-black uppercase text-slate-300 hover:text-white hover:border-[#42f5b3] transition active:scale-95"
            >
              ← Cerrar Expediente
            </button>
          ) : (
            <Link
              href="/rick"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#42f5b3]/40 bg-black px-5 py-2.5 font-mono text-xs font-black uppercase text-slate-300 hover:text-white hover:border-[#42f5b3] transition active:scale-95"
            >
              ← Volver a la Terminal
            </Link>
          )}

          {/* Jump portal action */}
          <button
            onClick={handleRandomWarp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#42f5b3] bg-[#42f5b3]/15 px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-[#42f5b3] shadow-[0_0_15px_rgba(66,245,179,0.15)] hover:bg-[#42f5b3] hover:text-black transition active:scale-95 cursor-pointer"
          >
            <IoSparklesOutline className="animate-spin" size={13} />
            Salto Interdimensional →
          </button>
        </div>
      </article>
    </div>
  );
}
