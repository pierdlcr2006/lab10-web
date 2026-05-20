"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md rounded-2xl border border-[#42f5b3]/50 bg-black p-8 text-center">
        <p className="font-display text-4xl font-black text-[#42f5b3]">
          Wubba Lubba!
        </p>
        <p className="mt-2 text-slate-400">Error en esta dimensión.</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 cursor-pointer rounded-lg border border-[#42f5b3] bg-[#42f5b3] py-2 font-mono font-bold text-black"
          >
            Reintentar
          </button>
          <Link
            href="/rick"
            className="flex-1 rounded-lg border border-white/20 py-2 font-mono font-bold text-white"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
