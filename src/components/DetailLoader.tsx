interface DetailLoaderProps {
  variant?: "pokemon" | "rick";
}

export default function DetailLoader({ variant = "pokemon" }: DetailLoaderProps) {
  const cls =
    variant === "pokemon"
      ? "border-4 border-black/30 bg-[#f8f4e8]/10"
      : "rick-card";

  return (
    <div className="flex justify-center p-8">
      <div className={`h-96 w-full max-w-lg animate-pulse rounded-2xl ${cls}`} />
    </div>
  );
}
