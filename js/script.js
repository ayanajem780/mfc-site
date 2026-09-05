/* =========================================================
   MFC — script.js
   =========================================================

   >>> POUR AYA : LE MENU EST ICI <<<
   Pour changer un produit, un prix ou une description,
   modifie simplement le tableau "menuData" ci-dessous.
   Chaque produit suit ce modèle :

   { name: "Nom du produit", price: "35 MAD", desc: "Description courte" }

   category doit rester exactement : "milkshakes", "cafes" ou "glaces"
   ========================================================= */

const menuData = [
  // ----------------- MILKSHAKES (à remplacer par tes vrais produits/prix) -----------------
  { category: "milkshakes", name: "Milkshake Fraise", price: "35 MAD", desc: "Fraises fraîches, lait entier, glace vanille" },
  { category: "milkshakes", name: "Milkshake Chocolat", price: "35 MAD", desc: "Chocolat noir fondu, chantilly, copeaux" },
  { category: "milkshakes", name: "Milkshake Vanille", price: "32 MAD", desc: "Vanille de Madagascar, crème fouettée" },
  { category: "milkshakes", name: "Milkshake Caramel Beurre Salé", price: "38 MAD", desc: "Caramel maison, fleur de sel" },
  { category: "milkshakes", name: "Milkshake Oreo", price: "38 MAD", desc: "Biscuits Oreo, glace vanille, chantilly" },
  { category: "milkshakes", name: "Milkshake Pistache", price: "40 MAD", desc: "Pâte de pistache, éclats de pistache" },

  // ----------------- CAFÉS (à remplacer par tes vrais produits/prix) -----------------
  { category: "cafes", name: "Espresso", price: "12 MAD", desc: "Café pur, torréfaction maison" },
  { category: "cafes", name: "Cappuccino", price: "18 MAD", desc: "Espresso, mousse de lait onctueuse" },
  { category: "cafes", name: "Café Latte", price: "20 MAD", desc: "Espresso, lait vapeur, une touche de mousse" },
  { category: "cafes", name: "Café Glacé", price: "22 MAD", desc: "Espresso, glaçons, lait au choix" },
  { category: "cafes", name: "Mocha", price: "24 MAD", desc: "Espresso, chocolat, lait vapeur, chantilly" },
  { category: "cafes", name: "Café Noisette", price: "16 MAD", desc: "Espresso, nuage de lait" },

  // ----------------- GLACES (à remplacer par tes vrais produits/prix) -----------------
  { category: "glaces", name: "Glace Vanille", price: "15 MAD", desc: "Boule de glace vanille artisanale" },
  { category: "glaces", name: "Glace Chocolat", price: "15 MAD", desc: "Boule de glace chocolat intense" },
  { category: "glaces", name: "Glace Fraise", price: "15 MAD", desc: "Boule de glace fraise, fruits frais" },
  { category: "glaces", name: "Glace Pistache", price: "18 MAD", desc: "Boule de glace pistache véritable" },
  { category: "glaces", name: "Coupe Gourmande", price: "35 MAD", desc: "3 boules, chantilly, coulis, gaufrette" },
  { category: "glaces", name: "Glace Mangue", price: "18 MAD", desc: "Boule de glace mangue, fruit de saison" },
];

/* ===================== RENDU DU MENU ===================== */

const menuGrid = document.getElementById("menuGrid");
const tabButtons = document.querySelectorAll(".tab-btn");

function renderMenu(category) {
  const items = menuData.filter((item) => item.category === category);

  menuGrid.innerHTML = items
    .map(
      (item) => `
      <div class="menu-card">
        <div class="menu-card-head">
          <span class="menu-card-name">${item.name}</span>
          <span class="menu-card-price">${item.price}</span>
        </div>
        <p class="menu-card-desc">${item.desc}</p>
      </div>
    `
    )
    .join("");
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.category);
  });
});

renderMenu("milkshakes");

/* ===================== HEADER AU SCROLL ===================== */

const header = document.getElementById("header");

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);
updateHeader();

/* ===================== MENU MOBILE (BURGER) ===================== */

const burgerBtn = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");

burgerBtn.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

/* ===================== VITRINE MILKSHAKES (slider auto-play, une carte à la fois) ===================== */

const showcaseStage = document.getElementById("showcaseStage");

if (showcaseStage) {
  const showcaseWrapper = document.getElementById("showcaseWrapper");
  const showcaseCards = Array.from(showcaseStage.querySelectorAll(".showcase-card"));
  const showcaseDots = document.getElementById("showcaseDots");
  const prevBtn = document.getElementById("showcasePrev");
  const nextBtn = document.getElementById("showcaseNext");

  const AUTOPLAY_DELAY = 2800; // temps entre chaque carte (ms)
  const RESUME_DELAY = 4500; // temps avant reprise auto après une interaction manuelle
  const total = showcaseCards.length;
  let currentIndex = 0;

  // Pastilles de pagination (une par carte)
  showcaseCards.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      setIndex(i);
      pauseAutoplay();
    });
    showcaseDots.appendChild(dot);
  });
  const dots = Array.from(showcaseDots.children);

  // Renvoie le décalage circulaire le plus court entre deux index (pour un rebouclage fluide)
  function shortestOffset(idx, current) {
    let diff = idx - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  function render() {
    showcaseCards.forEach((card, i) => {
      const offset = shortestOffset(i, currentIndex);
      card.style.transform = `translateX(${offset * 100}%) scale(${offset === 0 ? 1 : 0.92})`;
      card.classList.toggle("is-active", offset === 0);
      card.style.opacity = offset === 0 ? "1" : "0";
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
    if (showcaseWrapper) {
      const activeCard = showcaseCards[currentIndex];
      const bg = activeCard.style.getPropertyValue("--card-bg");
      showcaseWrapper.style.setProperty("--showcase-bg", bg);
    }
  }

  function setIndex(i) {
    currentIndex = (i + total) % total;
    render();
  }

  function nextSlide() {
    setIndex(currentIndex + 1);
  }

  function prevSlide() {
    setIndex(currentIndex - 1);
  }

  render();

  // ----- Défilement automatique façon vidéo -----
  let autoplayInterval = null;
  let resumeTimeout = null;

  function startAutoplay() {
    if (autoplayInterval) return;
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }

  function pauseAutoplay() {
    stopAutoplay();
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(startAutoplay, RESUME_DELAY);
  }

  // Ne défile automatiquement que lorsque la vitrine est visible à l'écran
  const autoplayObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    },
    { threshold: 0.4 }
  );
  autoplayObserver.observe(showcaseStage);

  // Flèches
  nextBtn.addEventListener("click", () => {
    nextSlide();
    pauseAutoplay();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    pauseAutoplay();
  });

  // Glisser (souris + doigt) pour changer de carte manuellement
  let dragStartX = null;
  let isDragging = false;

  function dragStart(x) {
    dragStartX = x;
    isDragging = true;
  }

  function dragEnd(x) {
    if (!isDragging || dragStartX === null) return;
    const delta = x - dragStartX;
    const THRESHOLD = 40;
    if (delta > THRESHOLD) {
      prevSlide();
      pauseAutoplay();
    } else if (delta < -THRESHOLD) {
      nextSlide();
      pauseAutoplay();
    }
    isDragging = false;
    dragStartX = null;
  }

  showcaseStage.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragStart(e.pageX);
  });
  window.addEventListener("mouseup", (e) => dragEnd(e.pageX));

  showcaseStage.addEventListener(
    "touchstart",
    (e) => {
      dragStart(e.touches[0].clientX);
      pauseAutoplay();
    },
    { passive: true }
  );
  showcaseStage.addEventListener(
    "touchend",
    (e) => dragEnd(e.changedTouches[0].clientX),
    { passive: true }
  );
}

/* ===================== ANNÉE FOOTER ===================== */

document.getElementById("year").textContent = new Date().getFullYear();
