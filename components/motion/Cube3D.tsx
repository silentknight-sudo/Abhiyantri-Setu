// Pure-CSS rotating 3D cube (decorative)
export default function Cube3D({ size = 72, className = "" }: { size?: number; className?: string }) {
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
  return (
    <div aria-hidden className={`pointer-events-none ${className}`} style={{ perspective: 600, width: size, height: size }}>
      <div className="spin-3d relative h-full w-full">
        {faces.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-lg border border-amber-300/60 bg-gradient-to-br from-amber-300/80 to-amber-500/70 backdrop-blur-sm"
            style={{ transform: t }}
          />
        ))}
      </div>
    </div>
  );
}
