import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md rounded-2xl border-4 border-black bg-[#f8f4e8] p-8 text-center text-black shadow-[6px_6px_0_#000]">
        <p className="font-display text-6xl font-black text-[#e3350d]">404</p>
        <h1 className="font-display mt-2 text-xl font-black">
          Pokémon no encontrado
        </h1>
        <Link
          href="/pokemon"
          className="mt-6 inline-block rounded-lg border-2 border-black bg-[#e3350d] px-6 py-2 font-bold text-white shadow-[3px_3px_0_#000]"
        >
          Volver al Pokédex
        </Link>
      </div>
    </div>
  );
}
