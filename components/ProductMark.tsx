export function ProductMark({
  hue,
  brand,
  name,
}: {
  hue: string;
  brand: string;
  name: string;
}) {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line"
      style={{
        background: `linear-gradient(160deg, hsl(${hue} 42% 32%), hsl(${hue} 48% 14%))`,
      }}
    >
      <div className="absolute inset-6 rounded-xl border border-white/15" />
      <div className="absolute bottom-8 left-8 right-8">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">{brand}</p>
        <p className="mt-2 font-serif text-3xl text-white">{name}</p>
      </div>
    </div>
  );
}
