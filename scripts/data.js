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
  "How it Works?",
  "Software Design",
];

export const stories = [
  {
    id: "netflix-system-design",
    title: "Netflix System Design",
    summary: "An interactive deep-dive into the globally distributed architecture that streams billions of hours of video — from GraphQL API gateways to Kafka event streams and Open Connect CDN.",
    category: "Real World Studies",
    categories: ["Real World Studies", "How it Works?", "Software Design"],
    tags: ["Swift", "Kotlin", "React", "HTML5", "JavaScript", "GraphQL", "Spring Boot", "Netflix Zuul", "Zuul", "Netflix Eureka", "Eureka", "MySQL", "Cassandra", "CockroachDB", "AWS S3", "Apache Kafka", "Kafka", "Apache Flink", "Flink", "AWS CloudFront", "CloudFront", "Open Connect", "Apache Spark", "Spark", "Redshift", "Tableau", "Apache Druid", "Druid", "JIRA", "Confluence", "Jenkins", "Gradle", "Spinnaker", "REST", "gRPC", "WebSocket", "AWS", "Netflix Titus", "Titus", "Netflix Atlas", "Atlas", "Chaos Monkey"],
    image: "assets/images/netflix-system-design.jpg",
    page: "netflix.html",
    featured: true,
  },
  {
    id: "netflix-api-evolution",
    title: "Netflix API Evolution",
    summary: "From a 20TB Oracle monolith to a globally federated GraphQL graph — an interactive timeline of how Netflix's API architecture evolved across 5 distinct eras over 15 years.",
    category: "Real World Studies",
    categories: ["Real World Studies", "API and Web Development", "Software Design"],
    tags: ["GraphQL", "Falcor", "Apollo Federation", "Apollo Studio", "Netflix DGS", "DGS", "Netflix Zuul", "Zuul", "Ribbon", "Netflix Eureka", "Eureka", "Hystrix", "Turbine", "Chaos Monkey", "REST", "BFF", "BFF Pattern", "API Gateway", "Federation", "Circuit Breaker", "Spring Boot", "Microservices"],
    image: "assets/images/netflix-api-evolution.svg",
    page: "netflix-api.html",
    featured: true,
  },
  {
    id: "api-communication-styles",
    title: "gRPC, WebSocket & Webhook",
    summary: "Three API communication patterns — one decision guide. From compact binary Protobuf RPC calls over HTTP/2 to persistent full-duplex WebSocket channels to event-driven Webhook callbacks.",
    category: "API and Web Development",
    categories: ["API and Web Development", "How it Works?", "Software Design"],
    tags: ["gRPC", "WebSocket", "Webhook", "Protocol Buffers", "Protobuf", "HTTP/2", "HTTP Callbacks", "Bidirectional Streaming", "Full-Duplex", "Event-Driven", "HMAC", "Retry Logic", "REST", "Microservices", "SSE"],
    image: "assets/images/api-communication.svg",
    page: "api-communication.html",
    featured: true,
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
