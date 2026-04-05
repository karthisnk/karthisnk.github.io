import { getStoryById, categoryColor } from "./data.js";

/* ─── Theme ────────────────────────────────────────── */
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
document.getElementById("themeToggle")?.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

const params    = new URLSearchParams(window.location.search);
const storyId   = params.get("id");
const story     = getStoryById(storyId || "");

const storyCategory = document.getElementById("storyCategory");
const storyTitle    = document.getElementById("storyTitle");
const storyTags     = document.getElementById("storyTags");
const storyBody     = document.getElementById("storyBody");

if (!story) {
  document.title = "Not Found | Karthi's Design Book";
  storyCategory.textContent = "Not Found";
  storyTitle.textContent    = "This story is not available yet";
  storyTags.textContent     = "Use the dashboard to pick another card.";
  storyBody.innerHTML       = "<p>The route exists — this page is ready for real content wiring later.</p>";
} else {
  document.title = `${story.title} | Karthi's Design Book`;

  const color = categoryColor(story.category);
  storyCategory.textContent  = story.category;
  storyCategory.style.color  = color;

  storyTitle.textContent = story.title;
  storyTags.textContent  = story.tags.join(" · ");

  storyBody.innerHTML = [
    `<p><strong>Mock data mode:</strong> This page is using placeholder content while the final narrative is prepared. The interaction model is fully wired — click, share, and deep-link all work.</p>`,
    `<p>${story.summary}</p>`,
    `<p>When real content is added, this section will expand into a long-form story with architecture diagrams, code snippets, timelines, and annotated insights. Everything you need to understand the concept end-to-end.</p>`,
    `<p>Each card on the dashboard links directly here via its unique ID in the URL, enabling direct sharing and deep-linking without any server-side routing.</p>`,
  ].join("\n");
}

