import type { RevealApi } from 'reveal.js';

interface Agent { x: number; y: number; vx: number; vy: number; }
type Weights = Record<'s' | 'a' | 'c' | 'f' | 'e' | 'w', number>;

export const setupSwarmLabDa = (deck: RevealApi) => {
  const slide = document.querySelector<HTMLElement>('[data-slide-id="swarm-lab-da"]');
  const canvas = slide?.querySelector<HTMLCanvasElement>('[data-swarm-lab-da]');
  const context = canvas?.getContext('2d');
  if (!slide || !canvas || !context) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const defaults: Weights = { s: 0.1, a: 0.1, c: 0.1, f: 2, e: 0.1, w: 0.9 };
  const agents: Agent[] = Array.from({ length: 18 }, (_, index) => ({ x: 0.15 + ((index * 0.047) % 0.72), y: 0.2 + ((index * 0.083) % 0.6), vx: index % 2 ? 0.012 : -0.012, vy: index % 3 ? -0.009 : 0.009 }));
  let weights = { ...defaults }; let radius = 0.18; let selected = -1; let running = !reduced.matches; let active = false; let last = performance.now();
  const resize = () => { const bounds = canvas.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1; canvas.width = Math.max(1, bounds.width * ratio); canvas.height = Math.max(1, bounds.height * ratio); context.setTransform(ratio, 0, 0, ratio, 0, 0); };
  const reset = () => agents.forEach((agent, index) => { agent.x = 0.15 + ((index * 0.047) % 0.72); agent.y = 0.2 + ((index * 0.083) % 0.6); agent.vx = index % 2 ? 0.012 : -0.012; agent.vy = index % 3 ? -0.009 : 0.009; });
  const pointer = (event: PointerEvent) => { const bounds = canvas.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width; const y = (event.clientY - bounds.top) / bounds.height; let nearest = -1; let distance = 0.05; agents.forEach((agent, index) => { const d = Math.hypot(agent.x - x, agent.y - y); if (d < distance) { nearest = index; distance = d; } }); selected = nearest; };
  canvas.addEventListener('pointerdown', pointer);
  const draw = (delta: number) => {
    const bounds = canvas.getBoundingClientRect(); const food = { x: 0.77, y: 0.3 }; const enemy = { x: 0.2, y: 0.76 }; const dt = Math.min(32, delta) / 1000;
    context.clearRect(0, 0, bounds.width, bounds.height); context.fillStyle = '#28b8c8'; context.beginPath(); context.arc(food.x * bounds.width, food.y * bounds.height, 5, 0, Math.PI * 2); context.fill(); context.fillStyle = '#d86b6b'; context.beginPath(); context.arc(enemy.x * bounds.width, enemy.y * bounds.height, 5, 0, Math.PI * 2); context.fill();
    if (running && active && !reduced.matches) agents.forEach((agent, index) => {
      let sx = 0; let sy = 0; let ax = 0; let ay = 0; let cx = 0; let cy = 0; let count = 0;
      agents.forEach((other, otherIndex) => { if (index === otherIndex) return; const dx = other.x - agent.x; const dy = other.y - agent.y; if (Math.hypot(dx, dy) < radius) { sx -= dx; sy -= dy; ax += other.vx; ay += other.vy; cx += other.x; cy += other.y; count += 1; } });
      if (count) { ax /= count; ay /= count; cx = cx / count - agent.x; cy = cy / count - agent.y; }
      const fx = food.x - agent.x; const fy = food.y - agent.y; const ex = enemy.x - agent.x; const ey = enemy.y - agent.y;
      const oldVx = agent.vx; const oldVy = agent.vy; agent.vx = weights.w * oldVx + dt * (weights.s * sx + weights.a * ax + weights.c * cx + weights.f * fx - weights.e * ex); agent.vy = weights.w * oldVy + dt * (weights.s * sy + weights.a * ay + weights.c * cy + weights.f * fy - weights.e * ey); agent.x = (agent.x + agent.vx * 60 * dt + 1) % 1; agent.y = (agent.y + agent.vy * 60 * dt + 1) % 1;
    });
    const selectedAgent = selected >= 0 ? agents[selected] : null; if (selectedAgent) { context.strokeStyle = 'rgba(40,184,200,.45)'; context.setLineDash([4, 4]); context.beginPath(); context.arc(selectedAgent.x * bounds.width, selectedAgent.y * bounds.height, radius * Math.min(bounds.width, bounds.height), 0, Math.PI * 2); context.stroke(); context.setLineDash([]); }
    agents.forEach((agent, index) => { context.fillStyle = index === selected ? '#f0a43c' : '#28b8c8'; context.beginPath(); context.arc(agent.x * bounds.width, agent.y * bounds.height, index === selected ? 5 : 3.5, 0, Math.PI * 2); context.fill(); if (index === selected) agents.forEach((other, otherIndex) => { if (otherIndex !== index && Math.hypot(other.x - agent.x, other.y - agent.y) < radius) { context.strokeStyle = 'rgba(40,184,200,.32)'; context.beginPath(); context.moveTo(agent.x * bounds.width, agent.y * bounds.height); context.lineTo(other.x * bounds.width, other.y * bounds.height); context.stroke(); } }); });
    const selectedText = slide.querySelector<HTMLElement>('[data-lab-selected]'); if (selectedText) selectedText.textContent = selectedAgent ? `Node ${selected + 1} · ${agents.filter((other, index) => index !== selected && selectedAgent && Math.hypot(other.x - selectedAgent.x, other.y - selectedAgent.y) < radius).length} tetangga` : 'Belum ada node dipilih.';
  };
  const render = (now: number) => { const delta = now - last; last = now; if (active) draw(delta); requestAnimationFrame(render); };
  deck.on('slidechanged', () => { active = slide.classList.contains('present'); if (active) resize(); });
  window.addEventListener('resize', () => { if (active) resize(); });
  slide.querySelector('[data-lab-action="toggle"]')?.addEventListener('click', (event) => { running = !running; (event.currentTarget as HTMLButtonElement).textContent = running ? 'Pause' : 'Play'; });
  slide.querySelector('[data-lab-action="step"]')?.addEventListener('click', () => { const old = running; running = true; draw(16); running = old; });
  slide.querySelector('[data-lab-action="reset"]')?.addEventListener('click', reset);
  slide.querySelectorAll<HTMLInputElement>('[data-lab-weight]').forEach((input) => input.addEventListener('input', () => { weights[input.dataset.labWeight as keyof Weights] = Number(input.value); }));
  slide.querySelector<HTMLInputElement>('[data-lab-radius]')?.addEventListener('input', (event) => { radius = Number((event.currentTarget as HTMLInputElement).value); });
  reduced.addEventListener('change', () => { running = !reduced.matches; }); active = slide.classList.contains('present'); if (active) resize(); requestAnimationFrame(render);
};
