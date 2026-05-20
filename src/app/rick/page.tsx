import RickExplorer from "./RickExplorer";
import { CharacterListResponse } from "../../types/rickandmorty";

async function getInitialCharacters() {
  // Enforces caching at fetch level to serve as static content (SSG)
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los personajes de Rick y Morty");
  }

  const data: CharacterListResponse = await res.json();
  return data.results || [];
}

export default async function RickPage() {
  const characters = await getInitialCharacters();
  return <RickExplorer initialCharacters={characters} />;
}
