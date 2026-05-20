"use client";

import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-white p-8">
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-10 rounded-2xl max-w-md w-full flex flex-col items-center shadow-2xl">
        <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 mb-6 animate-pulse">
          <IoWarningOutline size={64} className="text-emerald-450" />
        </div>

        <h1 className="text-3xl font-black mb-2 text-center">
          ¡Wubba Lubba Dub Dub!
        </h1>

        <p className="text-slate-400 text-center mb-8 text-sm">
          Ocurrió un error en esta dimensión al cargar a los personajes.
        </p>

        <div className="flex gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-6 py-3 rounded-xl transition duration-300 shadow-lg shadow-emerald-500/20 cursor-pointer text-center"
          >
            Reintentar
          </button>

          <Link
            href="/rick"
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition duration-300 border border-white/10 text-center"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
