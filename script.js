const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let w, h, raf;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function spawn() {
  particles = Array.from({ length: Math.min(90, Math.floor(w / 18)) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    a: Math.random() * 0.45 + 0.1,
  }));
}
spawn();
window.addEventListener("resize", spawn);

function tick() {
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.fillStyle = `rgba(155,109,255,${p.a})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < 110) {
        ctx.strokeStyle = `rgba(92,225,230,${(1 - d / 110) * 0.12})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  raf = requestAnimationFrame(tick);
}
tick();

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
toggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");
document.querySelectorAll(".panel").forEach((btn) => {
  btn.addEventListener("click", () => {
    lbImg.src = btn.dataset.src;
    lbCap.textContent = btn.dataset.caption || "";
    lb.hidden = false;
  });
});
document.querySelector(".lb-close").addEventListener("click", () => {
  lb.hidden = true;
  lbImg.src = "";
});
lb.addEventListener("click", (e) => {
  if (e.target === lb) {
    lb.hidden = true;
    lbImg.src = "";
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lb.hidden = true;
    lbImg.src = "";
  }
});
