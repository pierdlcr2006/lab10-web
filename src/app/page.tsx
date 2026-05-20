import Link from "next/link";
import { IoGameController, IoPlanetOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
        
        {/* Title and subtitle */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
            Desarrollo de Aplicaciones <br />
            <span className="bg-gradient-to-r from-yellow-400 via-emerald-450 to-purple-500 bg-clip-text text-transparent">
              Web Avanzado
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Next.js App Router: Enrutamiento, Generación Estática (SSG), Regeneración Estática Incremental (ISR) y Renderizado del Cliente (CSR).
          </p>
        </div>

        {/* Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          {/* Pokédex Card */}
          <Link
            href="/pokemon"
            className="group relative flex flex-col justify-between p-8 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl text-left hover:border-yellow-400/30 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/5 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Hover Background Glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-yellow-400/20 to-purple-600/0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300"></div>

            <div className="relative z-10 space-y-6">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-yellow-400/20 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                <IoGameController size={32} />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white group-hover:text-yellow-450 transition-colors duration-300">
                  Pokédex Next.js
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Explora los 151 Pokémon originales. Utiliza rutas dinámicas, generación estática de parámetros (SSG) y regeneración estática incremental (ISR) revalidada cada 24 horas.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 flex items-center gap-1 text-sm font-bold text-yellow-400 group-hover:translate-x-1 transition-transform duration-300 mt-6">
              <span>Ingresar al Pokédex</span>
              <span>→</span>
            </div>
          </Link>

          {/* Rick & Morty Card */}
          <Link
            href="/rick"
            className="group relative flex flex-col justify-between p-8 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl text-left hover:border-emerald-400/30 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/5 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Hover Background Glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/20 to-cyan-600/0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300"></div>

            <div className="relative z-10 space-y-6">
              <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <IoPlanetOutline size={32} />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors duration-300">
                  Rick & Morty Explorer
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Busca y filtra personajes en tiempo real (CSR) por nombre, estado, tipo y género. Con caché en el servidor (SSG) e ISR de 10 días.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 flex items-center gap-1 text-sm font-bold text-emerald-400 group-hover:translate-x-1 transition-transform duration-300 mt-6">
              <span>Ingresar al Explorador</span>
              <span>→</span>
            </div>
          </Link>

        </div>

        {/* Footer info */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>Desarrollo de Aplicaciones Web Avanzado • C24 - Sección C-D</p>
          <p className="mt-2 md:mt-0 font-medium">Docente: Ricardo Coello Palomino</p>
        </div>

      </div>
    </div>
  );
}
