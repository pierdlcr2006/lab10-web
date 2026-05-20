import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  try {
    const pokemonRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      { next: { revalidate: 86400 } }
    );

    if (!pokemonRes.ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const pokemon = await pokemonRes.json();

    let description = "No hay descripción disponible para esta especie.";

    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`,
      { next: { revalidate: 86400 } }
    );

    if (speciesRes.ok) {
      const speciesData = await speciesRes.json();
      const spanishEntry = speciesData.flavor_text_entries.find(
        (entry: { language: { name: string } }) => entry.language.name === "es"
      );
      if (spanishEntry) {
        description = spanishEntry.flavor_text.replace(/\f/g, " ");
      } else {
        const englishEntry = speciesData.flavor_text_entries.find(
          (entry: { language: { name: string } }) => entry.language.name === "en"
        );
        if (englishEntry) {
          description = englishEntry.flavor_text.replace(/\f/g, " ");
        }
      }
    }

    return NextResponse.json({ pokemon, description });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  }
}
