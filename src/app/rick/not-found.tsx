import Link from "next/link";
import { IoSkullOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-white p-8">
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-10 rounded-2xl max-w-md w-full flex flex-col items-center shadow-2xl">
        <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20 mb-6 animate-bounce">
          <IoSkullOutline size={64} className="text-red-450" />
        </div>

        <h1 className="text-5xl font-black mb-2 text-center text-red-500">
          404
        </h1>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Dimensión no encontrada
        </h2>

        <p className="text-slate-400 text-center mb-8 text-sm">
          El personaje que estás buscando no existe en esta línea de tiempo.
        </p>

        <Link
          href="/rick"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-6 py-3 rounded-xl transition duration-300 shadow-lg text-center cursor-pointer"
        >
          Volver a Rick & Morty
        </Link>
      </div>
    </div>
  );
}
