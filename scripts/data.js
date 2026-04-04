export const CATEGORY_COLORS = {
  "API and Web Development":  "#2563eb",
  "Real World Studies":       "#0891b2",
  "Al and Machine Learning":  "#7c3aed",
  "Database":                 "#1d4ed8",
  "Technical Topics":         "#475569",
  "Performance & Caching":    "#d97706",
  "Finance Tech":             "#059669",
  "Software Design":          "#db2777",
  "DevTools & Productivity":  "#8b5cf6",
  "Cloud":                    "#0284c7",
  "Distributed Systems":      "#ea580c",
  "How it Works?":            "#16a34a",
  "DevOps and CI/CD":         "#dc2626",
  "Security":                 "#b91c1c",
  "Computer Fundamentals":    "#64748b",
};

export const categories = [
  "API and Web Development",
  "Real World Studies",
  "Al and Machine Learning",
  "Database",
  "Technical Topics",
  "Performance & Caching",
  "Finance Tech",
  "Software Design",
  "DevTools & Productivity",
  "Cloud",
  "Distributed Systems",
  "How it Works?",
  "DevOps and CI/CD",
  "Security",
  "Computer Fundamentals",
];

export const stories = [
  {
    id: "netflix-system-design",
    title: "Netflix System Design",
    summary: "An interactive deep-dive into the globally distributed architecture that streams billions of hours of video — from GraphQL API gateways to Kafka event streams and Open Connect CDN.",
    category: "Real World Studies",
    categories: ["Real World Studies", "How it Works?", "Software Design"],
    tags: ["GraphQL", "Kafka", "Cassandra", "React", "Spring Boot", "Eureka", "Zuul", "Spark", "Spinnaker", "AWS S3"],
    image: "assets/images/netflix-system-design.jpg",
    page: "netflix.html",
    featured: true,
  },
  {
    id: "api-contract-story",
    title: "API Contract Playbook",
    summary: "How teams avoid integration drift by treating API contracts as a product artifact everyone owns and versions deliberately.",
    category: "API and Web Development",
    tags: ["OpenAPI", "Versioning", "Frontend"],
    image: "https://picsum.photos/seed/api-contract/360/220",
    featured: true,
  },
  {
    id: "fraud-signals-journal",
    title: "Fraud Signals Journal",
    summary: "A real-world case study on risk signals, alert pipelines, and the decision timelines that separate false positives from genuine threats.",
    category: "Real World Studies",
    tags: ["Case Study", "Risk", "Alerts"],
    image: "https://picsum.photos/seed/fraud-signals/360/220",
    featured: true,
  },
  {
    id: "edge-ml-explained",
    title: "Edge ML Explained",
    summary: "Model serving near users with low-latency goals — how inference at the edge changes everything about your ML pipeline.",
    category: "Al and Machine Learning",
    tags: ["Inference", "MLOps", "Latency"],
    image: "https://picsum.photos/seed/edge-ml/360/220",
    featured: true,
  },
  {
    id: "schema-evolution-map",
    title: "Schema Evolution Map",
    summary: "Patterns for evolving relational and event schemas safely without halting deploys or losing production data.",
    category: "Database",
    tags: ["Migrations", "Backfill", "PostgreSQL"],
    image: "https://picsum.photos/seed/schema-evol/360/220",
  },
  {
    id: "perf-budget-lab",
    title: "Performance Budget Lab",
    summary: "Tracking page and API budget targets so that every feature ships with a measurable non-regression promise.",
    category: "Performance & Caching",
    tags: ["Caching", "Profiling", "SLO"],
    image: "https://picsum.photos/seed/perf-budget/360/220",
  },
  {
    id: "devflow-habits",
    title: "DevFlow Habits",
    summary: "Small workflow automations — aliases, scripts, and IDE configs — that compound into hours saved each sprint.",
    category: "DevTools & Productivity",
    tags: ["Tooling", "CLI", "Automation"],
    image: "https://picsum.photos/seed/devflow/360/220",
  },
  {
    id: "zero-trust-notes",
    title: "Zero Trust Notes",
    summary: "A blueprint for identity-first security decisions: why perimeter thinking fails and how to model trust dynamically.",
    category: "Security",
    tags: ["Identity", "Policy", "Access"],
    image: "https://picsum.photos/seed/zero-trust/360/220",
  },
  {
    id: "distributed-trace-story",
    title: "Distributed Trace Story",
    summary: "Understanding failures by following traces across services — from the first HTTP hop to the last database query.",
    category: "Distributed Systems",
    tags: ["Tracing", "Resilience", "Queues"],
    image: "https://picsum.photos/seed/dist-trace/360/220",
  },
  {
    id: "cloud-cost-patterns",
    title: "Cloud Cost Patterns",
    summary: "How high-growth teams tame unpredictable cloud bills without sacrificing reliability or developer velocity.",
    category: "Cloud",
    tags: ["FinOps", "AWS", "Kubernetes"],
    image: "https://picsum.photos/seed/cloud-cost/360/220",
  },
  {
    id: "cicd-blast-radius",
    title: "CI/CD Blast Radius",
    summary: "Designing pipelines that fail fast and fail safe — limiting the blast radius when something inevitably goes wrong.",
    category: "DevOps and CI/CD",
    tags: ["GitHub Actions", "Canary", "Rollback"],
    image: "https://picsum.photos/seed/cicd-blast/360/220",
  },
  {
    id: "finance-data-integrity",
    title: "Finance Data Integrity",
    summary: "The hidden complexity behind financial ledger systems — double-entry, idempotency, and audit trail design.",
    category: "Finance Tech",
    tags: ["Ledger", "Idempotency", "Audit"],
    image: "https://picsum.photos/seed/finance-int/360/220",
  },
  {
    id: "software-design-patterns",
    title: "Design Patterns Revisited",
    summary: "Gang of Four patterns through a modern lens — when they still apply, when they hurt, and what replaced them.",
    category: "Software Design",
    tags: ["Patterns", "SOLID", "Refactoring"],
    image: "https://picsum.photos/seed/design-patterns/360/220",
  },
  {
    id: "how-dns-works",
    title: "How DNS Actually Works",
    summary: "A deep dive into the resolver chain, TTLs, negative caching, and why that \"just flush DNS\" advice often makes things worse.",
    category: "How it Works?",
    tags: ["Networking", "DNS", "Infrastructure"],
    image: "https://picsum.photos/seed/how-dns/360/220",
  },
  {
    id: "cpu-cache-story",
    title: "CPU Cache Story",
    summary: "L1, L2, L3, and DRAM — understanding the memory hierarchy and why cache-line alignment matters for your hot loops.",
    category: "Computer Fundamentals",
    tags: ["CPU", "Memory", "Performance"],
    image: "https://picsum.photos/seed/cpu-cache/360/220",
  },
];

export function getStoryById(id) {
  return stories.find((s) => s.id === id) || null;
}

export function getFeaturedStories() {
  return stories.filter((s) => s.featured);
}

export function categoryColor(category) {
  return CATEGORY_COLORS[category] || "#6b7280";
}
