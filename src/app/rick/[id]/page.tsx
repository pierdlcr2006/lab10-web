import type { ComponentType } from "react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Character,
  CharacterListResponse,
} from "../../../types/rickandmorty";
import {
  IoPlanetOutline,
  IoLocationOutline,
  IoFilmOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import RenderBadge from "@/components/RenderBadge";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 },
  });
  if (!res.ok) notFound();
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  if (!res.ok) return [];
  const data: CharacterListResponse = await res.json();
  return data.results.map((char) => ({ id: char.id.toString() }));
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const c = await getCharacter(id);
    return { title: c.name, description: `Detalles de ${c.name}` };
  } catch {
    return { title: "Personaje" };
  }
}

function InfoBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ size?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#42f5b3]/25 bg-black/60 p-4">
      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase text-[#42f5b3]">
        <Icon size={14} />
        {label}
      </div>
      <p className="font-display text-lg font-bold text-white">{value}</p>
    </div>
  );
}

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  const statusStyle = (s: string) => {
    switch (s.toLowerCase()) {
      case "alive":
        return "text-[#42f5b3] border-[#42f5b3]/50 bg-[#42f5b3]/10";
      case "dead":
        return "text-red-400 border-red-500/50 bg-red-500/10";
      default:
        return "text-slate-400 border-slate-500/50 bg-slate-500/10";
    }
  };

  const date = new Date(character.created).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-3xl">
        <article className="overflow-hidden rounded-2xl border-2 border-[#42f5b3]/50 bg-black shadow-[0_0_50px_rgba(66,245,179,0.15)]">
          <div className="relative border-b border-[#42f5b3]/30 p-6 md:p-8">
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#42f5b3]/10 blur-3xl animate-portal" />

            <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-xl border-2 border-[#42f5b3] shadow-[0_0_24px_rgba(66,245,179,0.4)] md:h-52 md:w-52">
                <Image
                  fill
                  sizes="(max-width: 768px) 192px, 208px"
                  src={character.image}
                  alt={character.name}
                  className="object-cover"
                  priority
                />
              </div>

              <div className="text-center md:text-left">
                <div className="mb-2 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="font-mono text-xs text-slate-500">
                    ID-{character.id}
                  </span>
                  <RenderBadge mode="ISR" detail="10d" variant="rick" />
                </div>
                <h1 className="font-display text-4xl font-black text-[#97ce4c] md:text-5xl">
                  {character.name}
                </h1>
                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase ${statusStyle(character.status)}`}
                  >
                    {character.status}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                    {character.species}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                    {character.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-5 md:grid-cols-2 md:p-6">
            <InfoBlock
              icon={IoPlanetOutline}
              label="Origen"
              value={character.origin.name}
            />
            <InfoBlock
              icon={IoLocationOutline}
              label="Ubicación"
              value={character.location.name}
            />
            <InfoBlock
              icon={IoFilmOutline}
              label="Episodios"
              value={String(character.episode.length)}
            />
            <InfoBlock icon={IoCalendarOutline} label="Registro" value={date} />
            <div className="col-span-full rounded-lg border border-[#42f5b3]/25 bg-black/60 p-4 md:col-span-2">
              <p className="font-mono text-[10px] font-bold uppercase text-[#42f5b3]">
                Tipo
              </p>
              <p className="mt-1 font-display text-lg font-bold capitalize text-white">
                {character.type || "Estándar"} · {character.species}
              </p>
            </div>
          </div>

          <div className="border-t border-[#42f5b3]/20 p-4">
            <Link
              href="/rick"
              className="inline-flex items-center gap-2 rounded-lg border border-[#42f5b3] bg-[#42f5b3]/10 px-5 py-2.5 font-mono text-sm font-bold text-[#42f5b3] transition hover:bg-[#42f5b3] hover:text-black"
            >
              ← VOLVER AL PORTAL
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
