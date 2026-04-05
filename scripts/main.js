import { categories, stories, getFeaturedStories, categoryColor } from "./data.js";

/* ─── DOM refs ─────────────────────────────────────── */
const heroMainCard  = document.getElementById("heroMainCard");
const heroImage     = document.getElementById("heroImage");
const heroBody      = document.getElementById("heroBody");
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

const searchInput  = document.getElementById("searchInput");
const viewGrid     = document.getElementById("viewGrid");
const viewList     = document.getElementById("viewList");
const resetBtn     = document.getElementById("resetBtn");
const cardGrid     = document.getElementById("cardGrid");
const emptyState   = document.getElementById("emptyState");
const resultMeta   = document.getElementById("resultMeta");
const themeToggle  = document.getElementById("themeToggle");

/* ─── Theme ────────────────────────────────────────── */
// Default to dark; stored preference overrides on return visits
const storedTheme  = localStorage.getItem("theme");
const initialTheme = storedTheme || "dark"; // dark is the default on first visit
document.documentElement.setAttribute("data-theme", initialTheme);

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Keep in sync if the OS switches while the page is open (and no stored pref)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  if (!localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
  }
});

/* ─── State ────────────────────────────────────────── */
let activeCategory = "All";
let searchTerm     = "";
let currentView    = "grid";
let carouselIndex  = 0;
const featured = getFeaturedStories().slice(0, 3);

/* ─── Helpers ─────────────────────────────────────── */
const MAX_VISIBLE_TAGS = 5; // max tags shown before "+N" button

/**
 * Build inline style for a colorful category chip using the category's brand color.
 * Appends hex alpha suffixes: '1a' (~10% opacity) for background fill,
 * '40' (~25% opacity) for the border, full color for text.
 */
function chipStyle(color) {
  return `background:${color}1a;border:1px solid ${color}40;color:${color}`;
}

/* ═══════════════════════════════════════════════════
   Hero Carousel
   ═══════════════════════════════════════════════════ */
const HERO_FADE_MS = 200; // duration of hero-body fade-out before content swap

function _applyHeroContent(idx) {
  const main  = featured[idx];
  const mini1 = featured[(idx + 1) % featured.length];
  const mini2 = featured[(idx + 2) % featured.length];

  /* Big card */
  heroTagRow.innerHTML = "";
  heroImage.src = main.image || "";
  heroTitle.textContent = main.title;
  heroDesc.textContent  = main.summary;
  heroCardLink.href     = main.page || `story.html?id=${encodeURIComponent(main.id)}`;

  const allMainCats = main.categories || [main.category];
  allMainCats.forEach(cat => {
    const span = document.createElement("span");
    span.className = "hero-badge";
    const color = categoryColor(cat);
    span.style.cssText = chipStyle(color);
    span.textContent = cat;
    heroTagRow.appendChild(span);
  });

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

  observeMiniCards();
}

function renderHero(idx, animate = false) {
  if (!animate) {
    _applyHeroContent(idx);
    return;
  }
  // Fade out hero body, swap content, fade back in
  heroBody.classList.add("hero-body-exit");
  setTimeout(() => {
    _applyHeroContent(idx);
    heroBody.classList.remove("hero-body-exit");
    heroBody.classList.add("hero-body-enter");
    heroBody.addEventListener("animationend", () => {
      heroBody.classList.remove("hero-body-enter");
    }, { once: true });
  }, HERO_FADE_MS);
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
      renderHero(carouselIndex, true);
    });
    carouselDots.appendChild(btn);
  });
}

/* Auto-advance carousel every 6 s */
let carouselTimer = setInterval(() => {
  carouselIndex = (carouselIndex + 1) % featured.length;
  renderHero(carouselIndex, true);
}, 6000);

heroMainCard.addEventListener("mouseenter", () => clearInterval(carouselTimer));
heroMainCard.addEventListener("mouseleave", () => {
  carouselTimer = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % featured.length;
    renderHero(carouselIndex, true);
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

/* ─── Per-card tag expand click ────────────────────── */
cardGrid.addEventListener("click", e => {
  const btn = e.target.closest(".card-tag-more");
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const row = btn.closest(".card-tag-row");
  if (!row) return;
  const storyId = row.dataset.storyId;
  const story = stories.find(s => s.id === storyId);
  if (!story) return;
  // Replace entire row with all tags + collapse button
  row.innerHTML = story.tags
    .map(t => `<span class="card-tag">${t}</span>`)
    .join("") +
    `<button class="card-tag-less" aria-label="Show fewer tags">−&nbsp;less</button>`;
  row.dataset.expanded = "true";
});

cardGrid.addEventListener("click", e => {
  const btn = e.target.closest(".card-tag-less");
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const row = btn.closest(".card-tag-row");
  if (!row) return;
  const storyId = row.dataset.storyId;
  const story = stories.find(s => s.id === storyId);
  if (!story) return;
  row.innerHTML = buildTagRowInner(story);
  delete row.dataset.expanded;
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

function buildTagRowInner(story) {
  const visible = story.tags.slice(0, MAX_VISIBLE_TAGS);
  const hidden  = story.tags.length - MAX_VISIBLE_TAGS;
  let html = visible.map(t => `<span class="card-tag">${t}</span>`).join("");
  if (hidden > 0) {
    html += `<button class="card-tag-more" aria-label="Show ${hidden} more tags">+${hidden}</button>`;
  }
  return html;
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
    const a = document.createElement("a");
    a.className = "story-card";
    a.href = story.page || `story.html?id=${encodeURIComponent(story.id)}`;
    a.setAttribute("role", "listitem");
    a.setAttribute("aria-label", `Open story: ${story.title}`);

    /* Colorful category chips (top bar) */
    const allCats = story.categories || [story.category];
    const chipsHtml = allCats
      .map(cat => {
        const color = categoryColor(cat);
        return `<span class="card-cat-chip" style="${chipStyle(color)}">${cat}</span>`;
      })
      .join("");

    /* Thumbnail */
    const imgHtml = story.image
      ? `<img class="card-thumb" src="${story.image}" alt="" width="110" height="110" loading="lazy" />`
      : `<div class="card-thumb card-thumb-empty" aria-hidden="true"></div>`;

    /* Tags with +N overflow */
    const tagRowInner = buildTagRowInner(story);

    a.innerHTML = `
      <div class="card-content">
        <div class="card-cat-bar">${chipsHtml}</div>
        <h3 class="card-title-el">${story.title}</h3>
        <p class="card-desc">${story.summary}</p>
        <div class="card-tag-row" data-story-id="${story.id}">${tagRowInner}</div>
      </div>
      ${imgHtml}
    `;

    cardGrid.appendChild(a);
  });

  observeCards();
}

/* ═══════════════════════════════════════════════════
   Card entrance animation (IntersectionObserver)
   ═══════════════════════════════════════════════════ */
const CARD_STAGGER_MS       = 55;  // delay increment per story card
const MINI_INITIAL_DELAY_MS = 120; // base delay for mini hero cards
const MINI_STAGGER_MS       = 80;  // delay increment per mini card

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

function observeCards() {
  cardGrid.querySelectorAll(".story-card").forEach((card, i) => {
    card.style.animationDelay = `${i * CARD_STAGGER_MS}ms`;
    cardObserver.observe(card);
  });
}

/* Mini cards in the hero stack */
function observeMiniCards() {
  document.querySelectorAll(".mini-card").forEach((card, i) => {
    card.style.animationDelay = `${MINI_INITIAL_DELAY_MS + i * MINI_STAGGER_MS}ms`;
    cardObserver.observe(card);
  });
}

/* ═══════════════════════════════════════════════════
   Init
   ═══════════════════════════════════════════════════ */

// Read deep-link params set by story page chips (?category=X or ?tag=X)
(function applyUrlFilters() {
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get("category");
  const urlTag      = params.get("tag");
  if (urlCategory) activeCategory = urlCategory;
  if (urlTag) {
    searchTerm = urlTag.toLowerCase();
    if (searchInput) searchInput.value = urlTag;
  }
})();

buildDots();
renderHero(0);
buildCategories();
renderCards();

