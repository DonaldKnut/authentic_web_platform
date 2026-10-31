"use client";

/** Soft mesh gradient blobs — dark = electric blue/white glow; light = ice white/sky. */
export function AmbientMesh() {
  return (
    <div className="ambient-mesh pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
      <div className="ambient-blob ambient-blob-d" />
      <div className="ambient-grain" />
      <div className="ambient-veil" />
    </div>
  );
}
