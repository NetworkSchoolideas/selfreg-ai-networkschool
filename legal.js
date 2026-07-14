function getLegalLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl === "ru" || fromUrl === "en") return fromUrl;
  return localStorage.getItem("selfreg_lang") || "ru";
}

function getLegalTheme() {
  const saved = localStorage.getItem("selfreg_theme");
  return saved === "dark" || saved === "light" ? saved : "light";
}

function setLegalTheme(theme) {
  const normalized = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = normalized;
  localStorage.setItem("selfreg_theme", normalized);
  const labels = normalized === "dark"
    ? { ru: "Включить светлую тему", en: "Switch to light theme" }
    : { ru: "Включить тёмную тему", en: "Switch to dark theme" };
  const lang = document.documentElement.lang || "ru";
  const button = document.querySelector("[data-legal-theme]");
  if (button) {
    button.setAttribute("aria-label", labels[lang]);
    button.setAttribute("title", labels[lang]);
  }
}

function setLegalLang(lang) {
  const normalized = lang === "en" ? "en" : "ru";
  const labels = normalized === "en"
    ? {
      language: "Language selector",
      skip: "Skip to content",
      theme: "Theme",
      privacyTitle: "SelfReg AI — closed-test privacy notice",
      termsTitle: "SelfReg AI — closed-test participation rules"
    }
    : {
      language: "Выбор языка",
      skip: "Перейти к содержимому",
      theme: "Тема",
      privacyTitle: "SelfReg AI — конфиденциальность закрытого тестирования",
      termsTitle: "SelfReg AI — правила закрытого тестирования"
    };
  document.documentElement.lang = normalized;
  localStorage.setItem("selfreg_lang", normalized);
  document.querySelectorAll("[data-legal-copy]").forEach((node) => {
    node.hidden = node.getAttribute("data-legal-copy") !== normalized;
  });
  document.querySelectorAll("[data-legal-lang]").forEach((button) => {
    const active = button.getAttribute("data-legal-lang") === normalized;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-home-link]").forEach((link) => {
    link.setAttribute("href", `/?lang=${normalized}`);
  });
  document.querySelector(".legal-language")?.setAttribute("aria-label", labels.language);
  const themeButton = document.querySelector("[data-legal-theme]");
  if (themeButton) themeButton.textContent = labels.theme;
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) skipLink.textContent = labels.skip;
  document.title = window.location.pathname.includes("terms") ? labels.termsTitle : labels.privacyTitle;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", normalized);
  window.history.replaceState(null, "", url);
  setLegalTheme(getLegalTheme());
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-legal-lang]").forEach((button) => {
    button.addEventListener("click", () => setLegalLang(button.getAttribute("data-legal-lang")));
  });
  document.querySelector("[data-legal-theme]")?.addEventListener("click", () => {
    setLegalTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
  setLegalLang(getLegalLang());
});
