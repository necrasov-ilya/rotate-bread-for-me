const bread = document.querySelector("#bread");
const breadImage = bread.querySelector("img");
const message = document.querySelector("#message");
const languageButton = document.querySelector("#language");
const githubLink = document.querySelector(".github-link");

const translations = {
  ru: {
    prompt: "ПЕРЕВЕРНИ ХЛЕБ",
    thanks: "СПАСИБО!",
    breadLabel: "Перевернуть хлеб",
    breadAlt: "Пиксельная буханка хлеба",
    githubLabel: "Открыть проект на GitHub",
    languageLabel: "Switch to English",
    nextLanguage: "EN",
  },
  en: {
    prompt: "FLIP THE BREAD",
    thanks: "THANKS!",
    breadLabel: "Flip the bread",
    breadAlt: "A pixel-art loaf of bread",
    githubLabel: "Open the project on GitHub",
    languageLabel: "Переключить на русский",
    nextLanguage: "RU",
  },
};

let flipCount = 0;
let currentLanguage = "ru";
let isThanking = false;

function renderLanguage() {
  const copy = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  message.textContent = isThanking ? copy.thanks : copy.prompt;
  bread.setAttribute("aria-label", copy.breadLabel);
  breadImage.alt = copy.breadAlt;
  githubLink.setAttribute("aria-label", copy.githubLabel);
  languageButton.textContent = copy.nextLanguage;
  languageButton.setAttribute("aria-label", copy.languageLabel);
}

bread.addEventListener("click", () => {
  if (bread.classList.contains("flipping")) return;

  flipCount += 1;
  bread.disabled = true;
  bread.style.setProperty("--flip-direction", flipCount % 2 ? "normal" : "reverse");
  bread.classList.add("flipping");
  isThanking = true;
  renderLanguage();
});

bread.addEventListener("animationend", () => {
  bread.classList.remove("flipping");

  window.setTimeout(() => {
    isThanking = false;
    renderLanguage();
    bread.disabled = false;
    bread.focus({ preventScroll: true });
  }, 450);
});

languageButton.addEventListener("click", () => {
  currentLanguage = currentLanguage === "ru" ? "en" : "ru";
  renderLanguage();
});
