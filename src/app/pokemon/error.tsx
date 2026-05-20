"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md rounded-2xl border-4 border-black bg-[#f8f4e8] p-8 text-center text-black shadow-[6px_6px_0_#000]">
        <p className="font-display text-6xl font-black text-[#e3350d]">!</p>
        <h1 className="font-display mt-2 text-2xl font-black">Error</h1>
        <p className="mt-2 text-sm text-stone-600">
          No se pudieron cargar los datos.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 cursor-pointer rounded-lg border-2 border-black bg-[#e3350d] py-2 font-bold text-white"
          >
            Reintentar
          </button>
          <Link
            href="/pokemon"
            className="flex-1 rounded-lg border-2 border-black bg-white py-2 font-bold"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
