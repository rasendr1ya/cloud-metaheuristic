import type { RevealApi } from 'reveal.js';

interface Agent { x: number; y: number; vx: number; vy: number; }
const levyStep = (beta = 1.5) => {
  const sigma = Math.pow((gamma(1 + beta) * Math.sin(Math.PI * beta / 2)) / (gamma((1 + beta) / 2) * beta * Math.pow(2, (beta - 1) / 2)), 1 / beta);
  const u = (Math.random() || Number.EPSILON) * 2 - 1;
  const v = (Math.random() || Number.EPSILON) * 2 - 1;
  return 0.01 * (u * sigma) / Math.pow(Math.abs(v) || Number.EPSILON, 1 / beta);
};
const gamma = (z: number): number => { const p = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.984369578019572e-6, 1.5056327351493116e-7]; if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z)); const x = 0.9999999999998099 + p.reduce((sum, value, index) => sum + value / (z + index), 0); const t = z + p.length - 0.5; return Math.sqrt(2 * Math.PI) * Math.pow(t, z - 0.5) * Math.exp(-t) * x; };

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const setupCanvas = (canvas: HTMLCanvasElement, mode: 'static' | 'dynamic') => {
  const context = canvas.getContext('2d');
  if (!context) return null;
  const agents: Agent[] = Array.from({ length: mode === 'static' ? 10 : 14 }, (_, index) => ({
    x: 0.18 + ((index * 0.071) % 0.64),
    y: 0.25 + ((index * 0.137) % 0.5),
    vx: (index % 2 ? 1 : -1) * 0.018,
    vy: (index % 3 ? -1 : 1) * 0.012,
  }));
  return { canvas, context, agents, mode, radius: 0.24 };
};

export const setupDaBiology = (deck: RevealApi) => {
  const slide = document.querySelector<HTMLElement>('[data-slide-id="da-biology"]');
  if (!slide) return;
  const models = Array.from(slide.querySelectorAll<HTMLCanvasElement>('[data-swarm-biology]'))
    .map((canvas) => setupCanvas(canvas, canvas.dataset.swarmBiology as 'static' | 'dynamic'))
    .filter((model): model is NonNullable<typeof model> => model !== null);
  let running = !prefersReducedMotion.matches;
  let active = false;
  let frame = 0;
  let last = performance.now();

  const resize = (model: NonNullable<ReturnType<typeof setupCanvas>>) => {
    const ratio = window.devicePixelRatio || 1;
    const bounds = model.canvas.getBoundingClientRect();
    model.canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    model.canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    model.context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  // Motion model follows Mirjalili (2015): separation, alignment, cohesion,
  // food/enemy vectors, step/position update, and Lévy branch when isolated.
  // This canvas is population motion only; it does not schedule tasks to VMs.
  const draw = (model: NonNullable<ReturnType<typeof setupCanvas>>, delta: number) => {
    const bounds = model.canvas.getBoundingClientRect();
    const { context } = model;
    context.clearRect(0, 0, bounds.width, bounds.height);
    const radius = Math.min(bounds.width, bounds.height) * model.radius;
    const food = { x: bounds.width * 0.72, y: bounds.height * 0.42 };
    const enemy = { x: bounds.width * 0.2, y: bounds.height * 0.7 };
    context.strokeStyle = 'rgba(40, 184, 200, 0.3)';
    context.lineWidth = 1;
    context.setLineDash([3, 4]);
    context.beginPath();
    context.arc(model.agents[0].x * bounds.width, model.agents[0].y * bounds.height, radius, 0, Math.PI * 2);
    context.stroke();
    context.setLineDash([]);
    context.fillStyle = '#28b8c8';
    context.beginPath(); context.arc(food.x, food.y, 4, 0, Math.PI * 2); context.fill();
    if (model.mode === 'dynamic') {
      context.fillStyle = '#d86b6b';
      context.beginPath(); context.arc(enemy.x, enemy.y, 4, 0, Math.PI * 2); context.fill();
    }
    if (running && active && !prefersReducedMotion.matches) {
      const speed = delta / 1000;
      model.agents.forEach((agent, index) => {
        const target = model.mode === 'static' ? food : { x: bounds.width * 0.56, y: bounds.height * 0.48 };
        const dx = target.x / bounds.width - agent.x;
        const dy = target.y / bounds.height - agent.y;
        let separationX = 0; let separationY = 0; let alignmentX = 0; let alignmentY = 0;
        let cohesionX = 0; let cohesionY = 0; let neighborCount = 0;
        model.agents.forEach((other, otherIndex) => {
          if (index === otherIndex) return;
          const ox = other.x - agent.x; const oy = other.y - agent.y;
          if (Math.hypot(ox, oy) < model.radius) {
            separationX -= ox; separationY -= oy;
            alignmentX += other.vx; alignmentY += other.vy;
            cohesionX += other.x; cohesionY += other.y; neighborCount += 1;
          }
        });
        if (neighborCount) {
          alignmentX /= neighborCount; alignmentY /= neighborCount;
          cohesionX = cohesionX / neighborCount - agent.x; cohesionY = cohesionY / neighborCount - agent.y;
        }
        if (!neighborCount) { agent.x += levyStep() * Math.sign(agent.vx || 1); agent.y += levyStep() * Math.sign(agent.vy || 1); }
        const strength = model.mode === 'static' ? 0.006 : 0.014;
        agent.vx += (separationX * 0.006 + alignmentX * 0.08 + cohesionX * 0.012 + dx * strength) * speed;
        agent.vy += (separationY * 0.006 + alignmentY * 0.08 + cohesionY * 0.012 + dy * strength) * speed;
        if (model.mode === 'dynamic') {
          const ex = enemy.x / bounds.width - agent.x;
          const ey = enemy.y / bounds.height - agent.y;
          agent.vx -= ex * 0.008 * speed;
          agent.vy -= ey * 0.008 * speed;
        }
        agent.x = (agent.x + agent.vx * speed * 60 + 1) % 1;
        agent.y = (agent.y + agent.vy * speed * 60 + 1) % 1;
        context.fillStyle = index === 0 ? '#f0a43c' : '#28b8c8';
        context.beginPath(); context.arc(agent.x * bounds.width, agent.y * bounds.height, 3.5, 0, Math.PI * 2); context.fill();
      });
    } else {
      model.agents.forEach((agent) => {
        context.fillStyle = '#28b8c8';
        context.beginPath(); context.arc(agent.x * bounds.width, agent.y * bounds.height, 3.5, 0, Math.PI * 2); context.fill();
      });
    }
  };

  const render = (now: number) => {
    const delta = Math.min(32, now - last); last = now;
    if (active) models.forEach((model) => draw(model, delta));
    frame = requestAnimationFrame(render);
  };
  const setActive = () => {
    active = slide.classList.contains('present');
    if (active) models.forEach(resize);
  };
  deck.on('slidechanged', setActive);
  window.addEventListener('resize', () => { if (active) models.forEach(resize); });
  slide.querySelector<HTMLButtonElement>('[data-swarm-action="toggle"]')?.addEventListener('click', (event) => {
    running = !running;
    (event.currentTarget as HTMLButtonElement).textContent = running ? 'Pause' : 'Play';
  });
  slide.querySelector<HTMLButtonElement>('[data-swarm-action="reset"]')?.addEventListener('click', () => {
    models.forEach((model) => model.agents.forEach((agent, index) => { agent.x = 0.18 + ((index * 0.071) % 0.64); agent.y = 0.25 + ((index * 0.137) % 0.5); agent.vx = index % 2 ? 0.018 : -0.018; agent.vy = index % 3 ? -0.012 : 0.012; }));
  });
  slide.querySelector<HTMLInputElement>('[data-swarm-radius]')?.addEventListener('input', (event) => {
    const value = Number((event.currentTarget as HTMLInputElement).value);
    models.forEach((model) => { model.radius = value; });
  });
  prefersReducedMotion.addEventListener('change', () => { running = !prefersReducedMotion.matches; });
  setActive();
  frame = requestAnimationFrame(render);
  return () => cancelAnimationFrame(frame);
};
