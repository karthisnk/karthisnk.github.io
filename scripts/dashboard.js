const STATUS_RANK = {
  New: 0,
  Popular: 1,
  Experimental: 2,
  Stable: 3
};

const ICON_MAP = {
  orbit: "◎",
  cloud: "☁",
  spark: "✦",
  graph: "◫",
  wrench: "⌘",
  flask: "⚗"
};

const ui = {
  featuredGrid: document.querySelector("#featured-grid"),
  allGrid: document.querySelector("#all-grid"),
  tagChips: document.querySelector("#tag-chips"),
  summary: document.querySelector("#results-summary"),
  search: document.querySelector("#search-input"),
  category: document.querySelector("#category-filter"),
  status: document.querySelector("#status-filter"),
  clearFilters: document.querySelector("#clear-filters"),
  emptyState: document.querySelector("#empty-state"),
  emptyReset: document.querySelector("#empty-reset"),
  previewModal: document.querySelector("#preview-modal"),
  previewClose: document.querySelector("#preview-close"),
  previewCancel: document.querySelector("#preview-cancel"),
  previewTitle: document.querySelector("#preview-title"),
  previewDescription: document.querySelector("#preview-description"),
  previewTags: document.querySelector("#preview-tags"),
  previewStatus: document.querySelector("#preview-status"),
  previewMeta: document.querySelector("#preview-meta"),
  previewOpen: document.querySelector("#preview-open"),
  paletteDialog: document.querySelector("#command-palette"),
  paletteOpen: document.querySelector("#palette-trigger"),
  paletteClose: document.querySelector("#palette-close"),
  paletteInput: document.querySelector("#palette-input"),
  paletteResults: document.querySelector("#palette-results"),
  pageTransition: document.querySelector("#page-transition")
};

const state = {
  sites: [],
  query: "",
  category: "All",
  status: "All",
  tags: new Set(),
  selectedSite: null
};

const byPriority = (a, b) => {
  const aFeatured = a.featured ? 0 : 1;
  const bFeatured = b.featured ? 0 : 1;
  if (aFeatured !== bFeatured) return aFeatured - bFeatured;

  const aStatusRank = STATUS_RANK[a.status] ?? 9;
  const bStatusRank = STATUS_RANK[b.status] ?? 9;
  if (aStatusRank !== bStatusRank) return aStatusRank - bStatusRank;

  return a.title.localeCompare(b.title);
};

const normalizeSite = (site, idx) => {
  const normalizedTags = Array.from(new Set((site.tags || []).map((tag) => String(tag).trim()).filter(Boolean)));

  return {
    id: site.id || `site-${idx}`,
    slug: site.slug || site.id || `site-${idx}`,
    title: site.title || "Untitled Experience",
    description: site.description || "No description provided.",
    longDescription: site.longDescription || site.description || "No description provided.",
    path: site.path || "./index.html",
    category: site.category || "General",
    status: site.status || "Experimental",
    featured: Boolean(site.featured),
    tags: normalizedTags,
    icon: site.icon || "spark",
    stack: Array.isArray(site.stack) ? site.stack : []
  };
};

const readData = async () => {
  const response = await fetch("./assets/data/sites.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Unable to load sites metadata (${response.status})`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("sites.json must contain an array");
  }

  state.sites = data.map(normalizeSite).sort(byPriority);
};

const createSelectOptions = (select, values) => {
  select.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "All";
  defaultOption.textContent = "All";
  select.append(defaultOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
};

const renderFilterControls = () => {
  const categories = [...new Set(state.sites.map((site) => site.category))].sort();
  const statuses = [...new Set(state.sites.map((site) => site.status))].sort((a, b) => {
    return (STATUS_RANK[a] ?? 99) - (STATUS_RANK[b] ?? 99);
  });
  const tags = [...new Set(state.sites.flatMap((site) => site.tags))].sort();

  createSelectOptions(ui.category, categories);
  createSelectOptions(ui.status, statuses);

  ui.tagChips.innerHTML = "";
  tags.forEach((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tag-chip";
    button.textContent = tag;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      if (state.tags.has(tag)) {
        state.tags.delete(tag);
      } else {
        state.tags.add(tag);
      }
      render();
    });
    ui.tagChips.append(button);
  });
};

const siteMatches = (site) => {
  const query = state.query.trim().toLowerCase();
  const searchPass =
    !query ||
    site.title.toLowerCase().includes(query) ||
    site.description.toLowerCase().includes(query) ||
    site.tags.some((tag) => tag.toLowerCase().includes(query));

  const categoryPass = state.category === "All" || site.category === state.category;
  const statusPass = state.status === "All" || site.status === state.status;
  const tagsPass = [...state.tags].every((tag) => site.tags.includes(tag));

  return searchPass && categoryPass && statusPass && tagsPass;
};

const filteredSites = () => state.sites.filter(siteMatches).sort(byPriority);

const buildCard = (site, { compact = false } = {}) => {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role", "listitem");

  card.innerHTML = `
    <div class="card-head">
      <span class="card-icon" aria-hidden="true">${ICON_MAP[site.icon] || ICON_MAP.spark}</span>
      <p class="status-pill">${site.status}</p>
    </div>
    <div>
      <h3>${site.title}</h3>
      <p>${site.description}</p>
    </div>
    <div class="card-tags">
      ${site.tags.slice(0, compact ? 2 : 3).map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="card-footer">
      <span>${site.category}</span>
      <span class="cta">Open ↗</span>
    </div>
  `;

  card.addEventListener("click", () => navigateTo(site.path));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      navigateTo(site.path);
    }
    if (event.key.toLowerCase() === " ") {
      event.preventDefault();
      openPreview(site);
    }
  });

  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    openPreview(site);
  });

  return card;
};

const renderFeatured = (sites) => {
  const featured = sites.filter((site) => site.featured).slice(0, 6);
  ui.featuredGrid.innerHTML = "";

  featured.forEach((site) => ui.featuredGrid.append(buildCard(site, { compact: true })));
};

const renderAll = (sites) => {
  ui.allGrid.innerHTML = "";
  sites.forEach((site) => ui.allGrid.append(buildCard(site)));

  requestAnimationFrame(() => {
    ui.allGrid.querySelectorAll(".card").forEach((card) => {
      card.classList.add("entered");
    });
  });
};

const updateSummary = (count) => {
  const filterParts = [];
  if (state.query) filterParts.push(`query "${state.query}"`);
  if (state.category !== "All") filterParts.push(`category ${state.category}`);
  if (state.status !== "All") filterParts.push(`status ${state.status}`);
  if (state.tags.size) filterParts.push(`tags ${[...state.tags].join(", ")}`);

  const suffix = filterParts.length ? ` for ${filterParts.join(" • ")}` : "";
  ui.summary.textContent = `${count} experience${count === 1 ? "" : "s"} shown${suffix}.`;
};

const syncTagButtons = () => {
  ui.tagChips.querySelectorAll(".tag-chip").forEach((button) => {
    const isActive = state.tags.has(button.textContent || "");
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const resetFilters = () => {
  state.query = "";
  state.category = "All";
  state.status = "All";
  state.tags.clear();

  ui.search.value = "";
  ui.category.value = "All";
  ui.status.value = "All";

  render();
};

const render = () => {
  const results = filteredSites();
  renderFeatured(state.sites);
  renderAll(results);
  updateSummary(results.length);
  syncTagButtons();

  ui.emptyState.hidden = results.length > 0;
};

const openPreview = (site) => {
  state.selectedSite = site;
  ui.previewStatus.textContent = site.status;
  ui.previewTitle.textContent = site.title;
  ui.previewDescription.textContent = site.longDescription;
  ui.previewMeta.textContent = `${site.category} • ${site.stack.join(" / ") || "Web"}`;
  ui.previewOpen.href = site.path;
  ui.previewTags.innerHTML = site.tags.map((tag) => `<span>${tag}</span>`).join("");

  if (!ui.previewModal.open) {
    ui.previewModal.showModal();
  }
};

const closePreview = () => {
  if (ui.previewModal.open) {
    ui.previewModal.close();
  }
};

const navigateTo = (path) => {
  ui.pageTransition.classList.add("active");
  window.setTimeout(() => {
    window.location.assign(path);
  }, 220);
};

const openPalette = () => {
  if (!ui.paletteDialog.open) {
    ui.paletteDialog.showModal();
    ui.paletteInput.value = "";
    renderPalette(state.sites.slice(0, 10));
    window.setTimeout(() => ui.paletteInput.focus(), 20);
  }
};

const closePalette = () => {
  if (ui.paletteDialog.open) {
    ui.paletteDialog.close();
  }
};

const renderPalette = (sites) => {
  ui.paletteResults.innerHTML = "";

  if (!sites.length) {
    const empty = document.createElement("li");
    empty.className = "palette-item";
    empty.textContent = "No matching experiences.";
    ui.paletteResults.append(empty);
    return;
  }

  sites.forEach((site) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "palette-item";
    button.innerHTML = `
      <span>
        <strong>${site.title}</strong>
        <span class="meta">${site.description}</span>
      </span>
      <span class="meta">${site.category}</span>
    `;

    button.addEventListener("click", () => {
      closePalette();
      navigateTo(site.path);
    });

    listItem.append(button);
    ui.paletteResults.append(listItem);
  });
};

const setupRevealObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
};

const bindEvents = () => {
  ui.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  ui.category.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });

  ui.status.addEventListener("change", (event) => {
    state.status = event.target.value;
    render();
  });

  ui.clearFilters.addEventListener("click", resetFilters);
  ui.emptyReset.addEventListener("click", resetFilters);

  ui.previewClose.addEventListener("click", closePreview);
  ui.previewCancel.addEventListener("click", closePreview);
  ui.previewOpen.addEventListener("click", (event) => {
    event.preventDefault();
    const href = ui.previewOpen.getAttribute("href");
    closePreview();
    if (href) navigateTo(href);
  });

  if (ui.paletteOpen) {
    ui.paletteOpen.addEventListener("click", openPalette);
  }
  ui.paletteClose.addEventListener("click", closePalette);

  ui.paletteInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    const matches = state.sites.filter((site) => {
      return (
        site.title.toLowerCase().includes(query) ||
        site.description.toLowerCase().includes(query) ||
        site.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });

    renderPalette(matches.slice(0, 10));
  });

  document.addEventListener("keydown", (event) => {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const commandPressed = isMac ? event.metaKey : event.ctrlKey;

    if (commandPressed && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette();
    }

    if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
      event.preventDefault();
      openPalette();
    }

    if (event.key === "Escape") {
      closePreview();
      closePalette();
    }
  });
};

const init = async () => {
  try {
    await readData();
    renderFilterControls();
    bindEvents();
    render();
    setupRevealObserver();
  } catch (error) {
    ui.summary.textContent = error.message;
    ui.summary.style.color = "var(--danger)";
  }
};

init();
