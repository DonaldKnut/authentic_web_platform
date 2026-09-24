import { Box, Droplet, Lock, Pill, WifiOff } from "lucide-react";

export function CodeLocationsGrid() {
  const locations = [
    {
      type: "Box or pack",
      desc: "Often on the flap, side, or seal.",
      icon: Box,
      codeHint: "AF-NG-… or a square code",
    },
    {
      type: "Bottle or jar",
      desc: "Often on the back label or lid.",
      icon: Droplet,
      codeHint: "SN-… or a barcode",
    },
    {
      type: "Medicine strip",
      desc: "Often printed on the foil.",
      icon: Pill,
      codeHint: "Batch and serial numbers",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-ink">Where to look</h3>
      <p className="mt-1 text-sm text-muted">The code is printed on the pack. These are the usual spots.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.type}
              className="lift rounded-2xl border border-line bg-elev p-5 shadow-[var(--shadow)]"
            >
              <span className="inline-flex rounded-xl border border-line bg-soft-blue p-3 text-blue">
                <Icon className="h-5 w-5" />
              </span>
              <h4 className="mt-3 font-semibold text-ink">{item.type}</h4>
              <p className="mt-1 text-sm leading-6 text-muted">{item.desc}</p>
              <p className="mt-4 rounded-xl bg-soft px-3 py-2 font-mono text-[11px] text-ink">{item.codeHint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function VerdictPreviewCards() {
  return (
    <div className="rounded-3xl border border-line bg-elev p-6 shadow-[var(--shadow)] md:p-8">
      <h3 className="text-xl font-semibold text-ink">What you may see next</h3>
      <p className="mt-1 text-sm text-muted">The live check can come back in a few ways. Here are the two people ask about most.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/8 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Looks genuine
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            The code matches a registered pack. You still use your own judgement at the stall.
          </p>
        </div>
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/8 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-600">Needs care</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            The code is unknown, copied, or on a recall list. Do not buy or use it if you are unsure.
          </p>
        </div>
      </div>
    </div>
  );
}

export function OfflineSaverNotice() {
  return (
    <div className="rounded-3xl border border-line bg-elev p-5 shadow-[var(--shadow)]">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
          <WifiOff className="h-5 w-5" />
        </span>
        <div>
          <h4 className="font-semibold text-ink">No signal right now?</h4>
          <p className="mt-1 text-sm leading-6 text-muted">
            Write the code down or photograph the pack with your normal camera. Check it here when you have data.
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
            <Lock className="h-3.5 w-3.5" />
            The check still happens live when you come back.
          </p>
        </div>
      </div>
    </div>
  );
}
