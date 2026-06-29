const heroImage = document.querySelector(".hero-media img");
const stripImage = document.querySelector(".cinema-strip img");
const canAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateParallax() {
  if (!canAnimate) return;
  const y = window.scrollY;
  if (heroImage) {
    heroImage.style.setProperty("--scroll-y", `${Math.min(y * 0.035, 28)}px`);
    heroImage.style.translate = `0 ${Math.min(y * 0.035, 28)}px`;
  }
  if (stripImage) {
    const rect = stripImage.parentElement.getBoundingClientRect();
    const offset = Math.max(-32, Math.min(32, rect.top * -0.045));
    stripImage.style.translate = `0 ${offset}px`;
  }
}

let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  },
  { passive: true }
);

updateParallax();
