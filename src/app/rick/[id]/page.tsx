import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Character, CharacterListResponse } from "../../../types/rickandmorty";
import CharacterDetailClient from "./CharacterDetailClient";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // ISR 10 days
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
    return {
      title: `${c.name} | Citadel Record`,
      description: `Expediente interdimensional clasificado de la Ciudadela para ${c.name}`,
    };
  } catch {
    return { title: "Personaje" };
  }
}

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="px-4 py-8 md:px-6 md:py-10 theme-rick min-h-screen">
      <CharacterDetailClient character={character} />
    </div>
  );
}
