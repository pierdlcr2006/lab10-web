interface PageLoaderProps {
  variant?: "pokemon" | "rick";
  count?: number;
}

export default function PageLoader({ variant = "pokemon", count = 8 }: PageLoaderProps) {
  if (variant === "pokemon") {
    return (
      <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl border-4 border-black/30 bg-[#f8f4e8]/20"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rick-card skeleton aspect-[3/4]" />
      ))}
    </div>
  );
}
