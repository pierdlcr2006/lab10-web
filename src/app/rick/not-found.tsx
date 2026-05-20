import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md rounded-2xl border border-[#42f5b3]/50 bg-black p-8 text-center">
        <p className="font-display text-6xl font-black text-red-500">404</p>
        <h1 className="font-display mt-2 text-xl font-black text-[#97ce4c]">
          Dimensión no encontrada
        </h1>
        <Link
          href="/rick"
          className="mt-6 inline-block rounded-lg border border-[#42f5b3] bg-[#42f5b3]/10 px-6 py-2 font-mono font-bold text-[#42f5b3] hover:bg-[#42f5b3] hover:text-black"
        >
          Volver al portal
        </Link>
      </div>
    </div>
  );
}
