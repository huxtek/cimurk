export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  projectId: string;
  parentId: string | null;
  authorName: string;
  authorEmail: string;
  text: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  timeline: string;
  budget: string;
  author?: string;
  votes: number;
  createdAt: string;
}

export const TIMELINES = [
  "< 3 months",
  "3-6 months",
  "6-12 months",
  "1-2 years",
  "2-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
] as const;

export const BUDGETS = [
  "< $10K",
  "$10K - $50K",
  "$50K - $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $10M",
  "$10M - $100M",
  "$100M+",
] as const;

export const STAGES = [
  "💡 Idea",
  "🔍 Research",
  "📋 Planning",
  "🚀 Started",
  "🌱 Pre-Seed",
  "🌿 Seed",
  "🛠️ MVP",
  "📈 Growth",
  "🏛️ Scale / Policy",
] as const;

export type Stage = (typeof STAGES)[number];

export const CATEGORIES = [
  "🔓 Pre-Freedom",
  "💻 Software & Technology",
  "🏗️ Civil & Infrastructure",
  "⚡ Energy",
  "🏥 Healthcare & Medicine",
  "🎓 Education & Research",
  "🏦 Economy & Finance",
  "⚖️ Governance & Law",
  "🌱 Environment & Water",
  "🚆 Transportation & Logistics",
  "🏘️ Housing & Urban Development",
  "🎨 Culture, Arts & Media",
  "🤝 Civil Society & NGOs",
  "🛡️ Defense & Security Reform",
  "🌍 Foreign Policy & Diplomacy",
] as const;
