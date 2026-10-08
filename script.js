const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.getElementById("card");
const question = document.getElementById("question");
const sub = document.getElementById("sub");
const bunny = document.getElementById("bunny");
const floaties = document.getElementById("floaties");

/* ---------- floating hearts background ---------- */
const symbols = ["💗", "🌸", "✨", "💖", "🐰", "🎀"];
for (let i = 0; i < 22; i++) {
  const el = document.createElement("span");
  el.className = "floaty";
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = 16 + Math.random() * 20 + "px";
  el.style.animationDuration = 8 + Math.random() * 10 + "s";
  el.style.animationDelay = -Math.random() * 12 + "s";
  floaties.appendChild(el);
}

/* ---------- the "No" bunny button runs away ---------- */
const teasing = [
  "hehe too slow 🐇",
  "can't catch me! 💨",
  "nope, try Yes 😜",
  "stop it 🥺",
  "just press Yes 💖",
];
let escapes = 0;

function runAway(px, py) {
  // First time: take the button out of the layout, keep its spot
  if (!noBtn.classList.contains("running")) {
    const r = noBtn.getBoundingClientRect();
    noBtn.classList.add("running");
    noBtn.style.left = r.left + "px";
    noBtn.style.top = r.top + "px";
  }

  const w = noBtn.offsetWidth;
  const h = noBtn.offsetHeight;
  const pad = 12;
  const maxX = window.innerWidth - w - pad;
  const maxY = window.innerHeight - h - pad;

  // pick a random spot that is far enough from the pointer
  let x, y, tries = 0;
  do {
    x = pad + Math.random() * (maxX - pad);
    y = pad + Math.random() * (maxY - pad);
    tries++;
  } while (
    Math.hypot(x + w / 2 - px, y + h / 2 - py) < 220 && tries < 40
  );

  // also never land on top of the Yes button
  const yr = yesBtn.getBoundingClientRect();
  const overlapsYes =
    x < yr.right + 10 && x + w > yr.left - 10 &&
    y < yr.bottom + 10 && y + h > yr.top - 10;
  if (overlapsYes) {
    x = Math.min(maxX, Math.max(pad, yr.left > window.innerWidth / 2 ? pad : maxX));
  }

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  escapes++;
  sub.textContent = teasing[escapes % teasing.length];
}

// desktop: flee as soon as the mouse gets close
document.addEventListener("mousemove", (e) => {
  const r = noBtn.getBoundingClientRect();
  const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  if (d < 130) runAway(e.clientX, e.clientY);
});

// mobile / touch + safety nets so "No" can never be clicked
["mouseenter", "pointerdown", "touchstart", "focus"].forEach((evt) =>
  noBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    const p = e.touches ? e.touches[0] : e;
    runAway(p.clientX ?? window.innerWidth / 2, p.clientY ?? window.innerHeight / 2);
    noBtn.blur();
  }, { passive: false })
);
noBtn.addEventListener("click", (e) => e.preventDefault());

/* ---------- Yes! ---------- */
yesBtn.addEventListener("click", () => {
  card.classList.add("accepted");
  question.textContent = "Yaaay! 🎉 I knew it 💕";
  sub.textContent = "welcome back, my cute bunny 🐰💗";
  bunny.textContent = "🥰";
  noBtn.style.display = "none";

  const pieces = ["💖", "🌸", "🎀", "✨", "🐰", "💗"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = 2 + Math.random() * 3 + "s";
    c.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7000);
  }
});
