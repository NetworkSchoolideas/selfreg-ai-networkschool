const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealGroups = [
  ".story-shell > *",
  ".mission-intro",
  ".principles-grid > *",
  ".problem-grid > *",
  ".model-stage-card",
  ".ai-role-card",
  ".scenario-grid > *",
  ".evidence-header > *",
  ".visual-figure",
  ".interpretation-grid",
  ".secondary-study-card",
  ".data-grid > *",
  ".cluster-grid > *",
  ".media-copy",
  ".media-grid > *",
  ".future .split > *",
  ".case-grid > *",
  ".product-flow > *",
  "#teacher .split > *",
  "#safety .cards > *",
  ".risks-shell > *",
  ".risk-grid > *"
];

function setupReadingProgress() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const indicator = document.createElement("span");
  indicator.className = "site-progress";
  indicator.setAttribute("aria-hidden", "true");
  nav.append(indicator);

  let frame = 0;
  const update = () => {
    frame = 0;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    document.documentElement.style.setProperty("--reading-progress", progress.toFixed(4));
  };
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

function setupScrollReveals() {
  if (motionPreference.matches || !("IntersectionObserver" in window)) return;

  const targets = [];
  const seen = new Set();

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (seen.has(element)) return;
      seen.add(element);
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-delay", `${Math.min(index * 55, 275)}ms`);
      targets.push(element);
    });
  });

  if (!targets.length) return;
  document.documentElement.classList.add("motion-ready");

  const reveal = (element) => {
    if (!element.classList.contains("motion-reveal")) return;
    element.classList.add("is-revealed");
    const cleanup = () => {
      element.classList.remove("motion-reveal", "is-revealed");
      element.style.removeProperty("--motion-delay");
    };
    element.addEventListener("animationend", cleanup, { once: true });
    window.setTimeout(cleanup, 1200);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      reveal(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -7% 0px"
  });

  targets.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
      requestAnimationFrame(() => reveal(element));
    } else {
      observer.observe(element);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupReadingProgress();
  setupScrollReveals();
});
