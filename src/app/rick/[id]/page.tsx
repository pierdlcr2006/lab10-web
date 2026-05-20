import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Character, CharacterListResponse } from "../../../types/rickandmorty";
import { IoPlanetOutline, IoLocationOutline, IoFilmOutline, IoCalendarOutline, IoRibbonOutline } from "react-icons/io5";

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    {
      next: { revalidate: 864000 } // Revalida cada 10 días (ISR)
    }
  );

  if (!res.ok) notFound();

  return res.json();
}

// Genera rutas estáticas para SSG (Pre-renderizamos los primeros 20 personajes)
export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  if (!res.ok) return [];

  const data: CharacterListResponse = await res.json();
  return data.results.map((char) => ({
    id: char.id.toString(),
  }));
}

// Metadata dinámica
export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const character = await getCharacter(id);
    return {
      title: `${character.name} - Rick & Morty`,
      description: `Detalles sobre el personaje ${character.name}`,
    };
  } catch {
    return {
      title: "Personaje - Rick & Morty",
    };
  }
}

export default async function CharacterDetail({
  params,
}: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "dead":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const formattedDate = new Date(character.created).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="relative bg-gradient-to-r from-emerald-950/80 to-slate-900/80 p-8 md:p-12 border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            
            {/* Image section with lazy load */}
            <div className="relative w-56 h-56 rounded-2xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl shrink-0 group">
              <Image
                fill
                src={character.image}
                alt={character.name}
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority // Priority for detail main image
              />
            </div>
            
            {/* Main title & summary info */}
            <div className="space-y-4 text-center md:text-left">
              <span className="inline-block bg-slate-950/50 border border-white/5 px-3 py-1 rounded-full text-slate-400 text-xs font-mono">
                ID: #{character.id}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                {character.name}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${getStatusBadge(character.status)}`}>
                  {character.status}
                </span>
                <span className="text-sm bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-white/5 font-medium">
                  {character.species}
                </span>
                <span className="text-sm bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-white/5 font-medium">
                  {character.gender}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          
          {/* Column 1: Locations and Origins */}
          <div className="space-y-6">
            
            {/* Origin Card */}
            <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs border-b border-white/5 pb-2">
                <IoPlanetOutline size={16} />
                <span>Origen</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Nombre de dimensión/lugar:</p>
                <strong className="text-white text-base block mt-1">{character.origin.name}</strong>
              </div>
            </div>

            {/* Current Location Card */}
            <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs border-b border-white/5 pb-2">
                <IoLocationOutline size={16} />
                <span>Ubicación actual</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Lugar donde se encuentra:</p>
                <strong className="text-white text-base block mt-1">{character.location.name}</strong>
              </div>
            </div>

          </div>

          {/* Column 2: Dimensions, Episodes & Registration */}
          <div className="space-y-6">
            
            {/* Attributes Card */}
            <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs border-b border-white/5 pb-2">
                <IoRibbonOutline size={16} />
                <span>Detalle de tipo</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-xs">Tipo / Subtipo:</p>
                  <strong className="text-white text-sm block mt-1 capitalize">{character.type || "Estándar / N/A"}</strong>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Especie:</p>
                  <strong className="text-white text-sm block mt-1">{character.species}</strong>
                </div>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs border-b border-white/5 pb-2">
                <IoFilmOutline size={16} />
                <span>Apariciones & Creación</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-xs">Episodios:</p>
                  <strong className="text-white text-base block mt-1 flex items-center gap-1.5">
                    {character.episode.length} {character.episode.length === 1 ? 'episodio' : 'episodios'}
                  </strong>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Fecha de Registro:</p>
                  <strong className="text-white text-sm block mt-1 flex items-center gap-1.5">
                    <IoCalendarOutline className="text-slate-500" />
                    <span>{formattedDate}</span>
                  </strong>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Back Link */}
        <div className="px-8 py-6 bg-slate-950/50 border-t border-white/5 flex justify-start">
          <Link
            href="/rick"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-emerald-600 hover:text-black text-white font-bold py-3 px-6 rounded-xl transition duration-300 border border-white/5 shadow-lg cursor-pointer"
          >
            ← Volver a Rick & Morty
          </Link>
        </div>

      </div>
    </div>
  );
}
