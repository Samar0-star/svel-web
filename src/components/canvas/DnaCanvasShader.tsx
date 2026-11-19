import React, { useEffect, useRef } from 'react';

interface DnaCanvasShaderProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

interface Particle {
  strand: 1 | 2;
  angle: number;
  y: number;
  baseRadius: number;
  size: number;
  alpha: number;
}

interface QuantumDust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const DnaCanvasShader: React.FC<DnaCanvasShaderProps> = ({
  className = '',
  particleCount = 64,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const scrollRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Handle high-DPI scaling (cap at 2 for 60fps performance)
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse proximity tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas || !interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Generate Double Helix Particles
    const particles: Particle[] = [];
    const halfCount = Math.floor(particleCount / 2);

    for (let i = 0; i < halfCount; i++) {
      const step = i / halfCount;
      const y = step;
      const angle = step * Math.PI * 6; // 3 full helical turns

      // Strand 1
      particles.push({
        strand: 1,
        angle,
        y,
        baseRadius: 65,
        size: 2.2,
        alpha: 0.9,
      });

      // Strand 2 (phase shifted by 180 degrees)
      particles.push({
        strand: 2,
        angle: angle + Math.PI,
        y,
        baseRadius: 65,
        size: 2.2,
        alpha: 0.9,
      });
    }

    // Generate subtle Quantum Field dust particles
    const dustParticles: QuantumDust[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 500),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 1.5,
      alpha: 0.15 + Math.random() * 0.3,
    }));

    let rotationAngle = 0;

    // Render loop (Target 60 FPS)
    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      // Continuous rotation influenced by scroll position
      const scrollRotation = (scrollRef.current * 0.003) % (Math.PI * 2);
      rotationAngle += 0.015;
      const currentGlobalAngle = rotationAngle + scrollRotation;

      const centerX = width / 2;
      const helixHeight = height * 0.85;
      const startY = (height - helixHeight) / 2;

      // Draw subtle background quantum field dust
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (const d of dustParticles) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 153, ${d.alpha * 0.4})`;
        ctx.fill();
      }

      // Group strand pairs for connecting rungs
      const projectedNodes: Array<{
        x1: number;
        y1: number;
        z1: number;
        x2: number;
        y2: number;
        z2: number;
      }> = [];

      for (let i = 0; i < halfCount; i++) {
        const p1 = particles[i * 2];
        const p2 = particles[i * 2 + 1];
        if (!p1 || !p2) continue;

        const effectiveY = startY + p1.y * helixHeight;

        // Proximity calculation from mouse
        let radiusOffset1 = 0;
        let radiusOffset2 = 0;

        if (mouseRef.current.active) {
          const dy = mouseRef.current.y - effectiveY;
          const dist = Math.abs(dy);
          if (dist < 120) {
            const factor = (1 - dist / 120) * 20;
            radiusOffset1 = factor;
            radiusOffset2 = factor;
          }
        }

        const theta1 = p1.angle + currentGlobalAngle;
        const theta2 = p2.angle + currentGlobalAngle;

        const r1 = p1.baseRadius + radiusOffset1;
        const r2 = p2.baseRadius + radiusOffset2;

        const x1 = centerX + Math.cos(theta1) * r1;
        const z1 = Math.sin(theta1); // Depth factor (-1 to +1)

        const x2 = centerX + Math.cos(theta2) * r2;
        const z2 = Math.sin(theta2);

        projectedNodes.push({ x1, y1: effectiveY, z1, x2, y2: effectiveY, z2 });
      }

      // 1. Draw Hydrogen Base-Pair Rungs (Connecting bars)
      for (const pair of projectedNodes) {
        const avgZ = (pair.z1 + pair.z2) / 2;
        const depthAlpha = 0.15 + (avgZ + 1) * 0.25; // 0.15 to 0.65

        ctx.beginPath();
        ctx.moveTo(pair.x1, pair.y1);
        ctx.lineTo(pair.x2, pair.y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${depthAlpha * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center hydrogen bond node
        const midX = (pair.x1 + pair.x2) / 2;
        const midY = (pair.y1 + pair.y2) / 2;
        ctx.beginPath();
        ctx.arc(midX, midY, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 153, ${depthAlpha * 0.6})`;
        ctx.fill();
      }

      // 2. Draw Helical Strand Nodes with single-tone Emerald luminescence
      for (const pair of projectedNodes) {
        // Strand 1 node
        const scale1 = 0.7 + (pair.z1 + 1) * 0.35; // 0.7 to 1.4

        ctx.beginPath();
        ctx.arc(pair.x1, pair.y1, 2.5 * scale1, 0, Math.PI * 2);
        ctx.fillStyle = pair.z1 > 0 ? '#00E599' : 'rgba(255, 255, 255, 0.7)';
        ctx.shadowColor = '#00E599';
        ctx.shadowBlur = pair.z1 > 0 ? 8 : 2;
        ctx.fill();

        // Strand 2 node
        const scale2 = 0.7 + (pair.z2 + 1) * 0.35;
        ctx.beginPath();
        ctx.arc(pair.x2, pair.y2, 2.5 * scale2, 0, Math.PI * 2);
        ctx.fillStyle = pair.z2 > 0 ? '#00E599' : 'rgba(255, 255, 255, 0.7)';
        ctx.shadowColor = '#00E599';
        ctx.shadowBlur = pair.z2 > 0 ? 8 : 2;
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      // 3. Connect sequential nodes along Strand 1 and Strand 2
      ctx.beginPath();
      for (let i = 0; i < projectedNodes.length; i++) {
        const node = projectedNodes[i];
        if (!node) continue;
        if (i === 0) ctx.moveTo(node.x1, node.y1);
        else ctx.lineTo(node.x1, node.y1);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < projectedNodes.length; i++) {
        const node = projectedNodes[i];
        if (!node) continue;
        if (i === 0) ctx.moveTo(node.x2, node.y2);
        else ctx.lineTo(node.x2, node.y2);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleCount, interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive 3D DNA Double Helix Simulation"
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  );
};

export default DnaCanvasShader;
