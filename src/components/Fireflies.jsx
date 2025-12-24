import { useEffect, useRef } from "react";

const Fireflies = ({
  count = 120,
  color = "#00ffff",
  speed = 0.5,
  size = 4,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const FINAL_COUNT = isMobile ? Math.floor(count * 0.4) : count;
    const BASE_SIZE = isMobile ? size * 0.8 : size;
    const BASE_SPEED = isMobile ? speed * 0.6 : speed;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fireflies = Array.from({ length: FINAL_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      base: BASE_SIZE + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.02 + Math.random() * 0.03,
      dx: (Math.random() - 0.5) * BASE_SPEED,
      dy: (Math.random() - 0.5) * BASE_SPEED,
    }));

    let animationId;

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      fireflies.forEach((f) => {
        // 🔥 BIG, OBVIOUS BREATHING
        f.phase += f.phaseSpeed;
        const pulse = (Math.sin(f.phase) + 1) / 2; // 0 → 1

        const radius = f.base + pulse * 3; // noticeable size change
        const alpha = isMobile
          ? 0.2 + pulse * 0.5
          : 0.25 + pulse * 0.65;

        ctx.globalAlpha = alpha;
        ctx.shadowBlur = isMobile ? 10 : 22;
        ctx.shadowColor = color;
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(f.x, f.y, radius, 0, Math.PI * 2);
        ctx.fill();

        f.x += f.dx;
        f.y += f.dy;

        if (f.x <= 0 || f.x >= window.innerWidth) f.dx *= -1;
        if (f.y <= 0 || f.y >= window.innerHeight) f.dy *= -1;
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [count, color, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default Fireflies;
