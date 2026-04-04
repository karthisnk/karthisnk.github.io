import { categories, stories, getFeaturedStories, categoryColor } from "./data.js";

/* ─── DOM refs ─────────────────────────────────────── */
const heroMainCard  = document.getElementById("heroMainCard");
const heroImage     = document.getElementById("heroImage");
const heroTitle     = document.getElementById("heroTitle");
const heroDesc      = document.getElementById("heroDesc");
const heroTagRow    = document.getElementById("heroTagRow");
const heroTechTags  = document.getElementById("heroTechTags");
const heroCardLink  = document.getElementById("heroCardLink");
const heroMiniStack = document.getElementById("heroMiniStack");
const carouselDots  = document.getElementById("carouselDots");

const categoryScroll = document.getElementById("categoryScroll");
const scrollPrev     = document.getElementById("scrollPrev");
const scrollNext     = document.getElementById("scrollNext");

const searchInput = document.getElementById("searchInput");
const viewGrid    = document.getElementById("viewGrid");
const viewList    = document.getElementById("viewList");
const resetBtn    = document.getElementById("resetBtn");
const cardGrid    = document.getElementById("cardGrid");
const emptyState  = document.getElementById("emptyState");
const resultMeta  = document.getElementById("resultMeta");
const themeToggle = document.getElementById("themeToggle");

/* ─── Theme ────────────────────────────────────────── */
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ─── State ────────────────────────────────────────── */
let activeCategory = "All";
let searchTerm     = "";
let currentView    = "grid";
let carouselIndex  = 0;

const featured = getFeaturedStories();

/* ═══════════════════════════════════════════════════
   Hero Carousel
   ═══════════════════════════════════════════════════ */
function renderHero(idx) {
  const main  = featured[idx];
  const mini1 = featured[(idx + 1) % featured.length];
  const mini2 = featured[(idx + 2) % featured.length];

  /* Big card */
  heroTagRow.innerHTML = "";
  heroImage.src = main.image || "";
  heroTitle.textContent = main.title;
  heroDesc.textContent  = main.summary;
  heroCardLink.href     = main.page || `story.html?id=${encodeURIComponent(main.id)}`;
  const catBadge = document.createElement("span");
  catBadge.className = "hero-badge";
  catBadge.textContent = main.category;
  heroTagRow.appendChild(catBadge);

  heroTechTags.innerHTML = "";
  main.tags.forEach(tag => {
    const el = document.createElement("span");
    el.className = "hero-tech-tag";
    el.textContent = tag;
    heroTechTags.appendChild(el);
  });

  /* Mini cards */
  heroMiniStack.innerHTML = "";
  [mini1, mini2].forEach(story => {
    const a = document.createElement("a");
    a.className = "mini-card";
    a.href = story.page || `story.html?id=${encodeURIComponent(story.id)}`;
    a.setAttribute("aria-label", `Open story: ${story.title}`);

    const color = categoryColor(story.category);

    a.innerHTML = `
      <span class="mini-card-category" style="color:${color}">${story.category}</span>
      <h3 class="mini-card-title">${story.title}</h3>
      <p class="mini-card-desc">${story.summary}</p>
      <div class="mini-tag-row">${story.tags.map(t => `<span class="mini-tag">${t}</span>`).join("")}</div>
    `;
    heroMiniStack.appendChild(a);
  });

  /* Dots */
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === idx);
    d.setAttribute("aria-selected", String(i === idx));
  });
}

function buildDots() {
  carouselDots.innerHTML = "";
  featured.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.className = "dot" + (i === 0 ? " active" : "");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-label", `Slide ${i + 1}`);
    btn.setAttribute("aria-selected", String(i === 0));
    btn.addEventListener("click", () => {
      carouselIndex = i;
      renderHero(carouselIndex);
    });
    carouselDots.appendChild(btn);
  });
}

/* Auto-advance carousel every 6 s */
let carouselTimer = setInterval(() => {
  carouselIndex = (carouselIndex + 1) % featured.length;
  renderHero(carouselIndex);
}, 6000);

heroMainCard.addEventListener("mouseenter", () => clearInterval(carouselTimer));
heroMainCard.addEventListener("mouseleave", () => {
  carouselTimer = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % featured.length;
    renderHero(carouselIndex);
  }, 6000);
});

/* ═══════════════════════════════════════════════════
   Category filter bar
   ═══════════════════════════════════════════════════ */
function buildCategories() {
  categoryScroll.innerHTML = "";
  const options = ["All", ...categories];
  options.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-pill" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat === "All" ? "All Categories" : cat;
    btn.dataset.category = cat;
    btn.setAttribute("role", "listitem");
    btn.addEventListener("click", () => {
      activeCategory = cat;
      document.querySelectorAll(".cat-pill").forEach(p =>
        p.classList.toggle("active", p.dataset.category === activeCategory)
      );
      renderCards();
    });
    categoryScroll.appendChild(btn);
  });
}

scrollPrev.addEventListener("click", () => {
  categoryScroll.scrollBy({ left: -240, behavior: "smooth" });
});
scrollNext.addEventListener("click", () => {
  categoryScroll.scrollBy({ left: 240, behavior: "smooth" });
});

/* ═══════════════════════════════════════════════════
   Search + view toggle + reset
   ═══════════════════════════════════════════════════ */
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.toLowerCase().trim();
  renderCards();
});

[viewGrid, viewList].forEach(btn => {
  btn.addEventListener("click", () => {
    currentView = btn.dataset.view;
    viewGrid.classList.toggle("active", currentView === "grid");
    viewList.classList.toggle("active", currentView === "list");
    viewGrid.setAttribute("aria-pressed", String(currentView === "grid"));
    viewList.setAttribute("aria-pressed", String(currentView === "list"));
    cardGrid.classList.toggle("view-list", currentView === "list");
  });
});

resetBtn.addEventListener("click", () => {
  activeCategory = "All";
  searchTerm     = "";
  searchInput.value = "";
  document.querySelectorAll(".cat-pill").forEach(p =>
    p.classList.toggle("active", p.dataset.category === "All")
  );
  renderCards();
});

/* ═══════════════════════════════════════════════════
   Card rendering
   ═══════════════════════════════════════════════════ */
function matchesFilters(story) {
  const allCats = story.categories || [story.category];
  const categoryOk = activeCategory === "All" || allCats.includes(activeCategory);
  if (!categoryOk) return false;
  if (!searchTerm)  return true;

  const haystack = [story.title, ...allCats, story.summary, ...story.tags]
    .join(" ")
    .toLowerCase();
  return haystack.includes(searchTerm);
}

function renderCards() {
  const filtered = stories.filter(matchesFilters);
  cardGrid.innerHTML = "";

  resultMeta.textContent = `${filtered.length} card${filtered.length !== 1 ? "s" : ""}`;

  if (!filtered.length) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  filtered.forEach(story => {
    const color = categoryColor(story.category);

    const a = document.createElement("a");
    a.className = "story-card";
    a.href = story.page || `story.html?id=${encodeURIComponent(story.id)}`;
    a.setAttribute("role", "listitem");
    a.setAttribute("aria-label", `Open story: ${story.title}`);

    /* Build inner HTML */
    const tagsHtml = story.tags
      .map(t => `<span class="card-tag">${t}</span>`)
      .join("");

    const imgHtml = story.image
      ? `<img
           class="card-thumb"
           src="${story.image}"
           alt=""
           width="110"
           height="110"
           loading="lazy"
         />`
      : `<div class="card-thumb" aria-hidden="true"></div>`;

    const allCats = story.categories || [story.category];
    const categoriesHtml = allCats
      .map(cat => `<span class="card-cat-label" style="color:${categoryColor(cat)}">${cat}</span>`)
      .join('<span class="card-cat-sep"> · </span>');

    a.innerHTML = `
      <div class="card-content">
        <div class="card-categories">
          ${categoriesHtml}
        </div>
        <h3 class="card-title-el">${story.title}</h3>
        <p class="card-desc">${story.summary}</p>
        <div class="card-tag-row">${tagsHtml}</div>
      </div>
      ${imgHtml}
    `;

    cardGrid.appendChild(a);
  });
}

/* ═══════════════════════════════════════════════════
   Init
   ═══════════════════════════════════════════════════ */
buildDots();
renderHero(0);
buildCategories();
renderCards();

