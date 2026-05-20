type RenderMode = "SSG" | "ISR" | "CSR";

interface RenderBadgeProps {
  mode: RenderMode;
  detail?: string;
  variant?: "pokemon" | "rick" | "neutral";
}

const styles = {
  pokemon:
    "border-black bg-[#f8f4e8] text-black shadow-[2px_2px_0_#000]",
  rick: "border-[#42f5b3]/50 bg-[#42f5b3]/15 text-[#42f5b3]",
  neutral: "border-white/20 bg-white/10 text-white",
};

export default function RenderBadge({
  mode,
  detail,
  variant = "neutral",
}: RenderBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${styles[variant]}`}
    >
      {mode}
      {detail && <span className="opacity-70">· {detail}</span>}
    </span>
  );
}
