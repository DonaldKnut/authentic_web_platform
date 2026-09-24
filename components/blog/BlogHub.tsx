"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Newspaper,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Bookmark,
  Share2,
  TrendingUp,
  CheckCircle2,
  Mail,
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "tech" | "supply-chain" | "compliance" | "engineering";
  categoryLabel: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    featured: true,
    title: "Why Modern Packaging Needs Cryptographic Signatures, Not Just Simple QR Codes",
    excerpt: "Static QR codes can easily be duplicated by counterfeiters on color copiers. Here is how non-sequential ECC-256 signatures seal physical packaging integrity against cloning.",
    category: "tech",
    categoryLabel: "Anti-Counterfeit Tech",
    author: {
      name: "Dr. Aris Thorne",
      role: "Head of Cryptography",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    publishedAt: "Sept 20, 2026",
    readTime: "5 min read"
  },
  {
    id: "post-2",
    title: "Navigating the EU Digital Product Passport (DPP) Mandate for 2026",
    excerpt: "The European Union now requires verifiable supply chain provenance for electronics and textiles. Learn what data schemas your enterprise must expose by Q4.",
    category: "compliance",
    categoryLabel: "EU Compliance",
    author: {
      name: "Elena Rostova",
      role: "Global Policy Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    },
    publishedAt: "Sept 18, 2026",
    readTime: "4 min read"
  },
  {
    id: "post-3",
    title: "How Pharmaceutical Supply Chains Prevent Cold-Chain Diversion in West Africa",
    excerpt: "A case study on tracking 1.2 million insulin vials across regional distribution hubs using automated telemetry and custodian digital handshakes.",
    category: "supply-chain",
    categoryLabel: "Supply Chain",
    author: {
      name: "Tunde Bakare",
      role: "VP of Logistics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    publishedAt: "Sept 12, 2026",
    readTime: "6 min read"
  },
  {
    id: "post-4",
    title: "Designing for 15 Millisecond Verification Latency at Global Scale",
    excerpt: "How our distributed edge network processes over 100,000 product scans per second with sub-20ms cryptographic verification response times.",
    category: "engineering",
    categoryLabel: "Engineering",
    author: {
      name: "Marcus Vance",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    publishedAt: "Sept 05, 2026",
    readTime: "7 min read"
  },
  {
    id: "post-5",
    title: "Stopping Point-of-Sale Return Fraud in Luxury Fashion",
    excerpt: "Return fraud costs retailers billions annually. Discover how deactivating serial codes upon checkout stops bad actors from returning counterfeit lookalikes.",
    category: "tech",
    categoryLabel: "Anti-Counterfeit Tech",
    author: {
      name: "Sophie Chen",
      role: "Retail Solutions Director",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    publishedAt: "Aug 29, 2026",
    readTime: "4 min read"
  },
  {
    id: "post-6",
    title: "The Multi-Factor Trust Score: Evaluating Physical Item Risk in Real-Time",
    excerpt: "How geolocation velocity, batch scan patterns, and hardware tamper sensors combine into a single 0-100 real-time Trust Score.",
    category: "engineering",
    categoryLabel: "Engineering",
    author: {
      name: "Dr. Aris Thorne",
      role: "Head of Cryptography",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    publishedAt: "Aug 22, 2026",
    readTime: "5 min read"
  }
];

export function BlogHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => !p.featured);

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "tech", label: "Anti-Counterfeit Tech" },
    { id: "supply-chain", label: "Supply Chain" },
    { id: "compliance", label: "EU Compliance" },
    { id: "engineering", label: "Engineering" }
  ];

  const filteredPosts = regularPosts.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  const toggleBookmark = (id: string) => {
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-12">
      {/* Featured Article Hero Banner */}
      <section className="mb-14 rounded-3xl border border-line bg-elev p-6 md:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue/10 blur-3xl" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue/10 px-3.5 py-1 text-xs font-mono font-bold text-blue">
                ★ FEATURED ESSAY
              </span>
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted border border-line">
                {featuredPost.categoryLabel}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" />
                {featuredPost.readTime}
              </span>
            </div>

            <h2 className="font-syne text-2xl md:text-4xl font-extrabold text-ink leading-tight">
              {featuredPost.title}
            </h2>

            <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl">
              {featuredPost.excerpt}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line">
              {/* Author info */}
              <div className="flex items-center gap-3">
                <img
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  className="h-10 w-10 rounded-full object-cover border border-line"
                />
                <div>
                  <div className="text-xs font-bold text-ink">{featuredPost.author.name}</div>
                  <div className="text-[11px] text-muted">{featuredPost.author.role} • {featuredPost.publishedAt}</div>
                </div>
              </div>

              <Button href={`/resources/blog#${featuredPost.id}`} variant="primary" className="text-xs py-2.5">
                <span>Read Full Article</span>
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-line bg-surface p-6 flex flex-col justify-center text-center">
            <TrendingUp className="h-10 w-10 text-blue mx-auto mb-3" />
            <h4 className="font-syne font-bold text-ink text-base">Key Insight</h4>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              "Over 73% of counterfeit incidents happen during transit between unchecked regional distributor hubs."
            </p>
            <div className="mt-4 pt-4 border-t border-line text-[11px] font-mono text-blue font-semibold">
              Source: Global Supply Integrity Report 2026
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue text-white shadow-md shadow-blue/20"
                  : "border border-line bg-elev text-muted hover:border-blue/30 hover:text-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-muted font-mono">
          Showing {filteredPosts.length} articles
        </span>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            id={post.id}
            className="group flex flex-col justify-between rounded-3xl border border-line bg-elev p-6 shadow-sm transition-all hover:border-blue/40 hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue/10 px-3 py-1 text-[11px] font-mono font-semibold text-blue">
                  {post.categoryLabel}
                </span>
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className="text-muted hover:text-blue transition-colors"
                  title="Bookmark article"
                >
                  <Bookmark
                    className={`h-4 w-4 ${bookmarkedPosts[post.id] ? "fill-blue text-blue" : ""}`}
                  />
                </button>
              </div>

              <h3 className="font-syne mt-4 text-lg font-bold text-ink group-hover:text-blue transition-colors">
                {post.title}
              </h3>

              <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-7 w-7 rounded-full object-cover border border-line"
                />
                <div>
                  <div className="text-[11px] font-semibold text-ink">{post.author.name}</div>
                  <div className="text-[10px] text-muted">{post.readTime}</div>
                </div>
              </div>

              <span className="text-xs font-bold text-blue group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Subscription Card */}
      <section className="mt-16 rounded-3xl border border-blue/30 bg-gradient-to-r from-blue/10 via-elev to-blue/5 p-8 md:p-12 text-center">
        <div className="mx-auto max-w-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="font-syne text-2xl font-bold text-ink">Stay Ahead of Supply Chain Risks</h3>
          <p className="mt-2 text-xs md:text-sm text-muted">
            Subscribe to our bi-weekly dispatch on product identity, anti-counterfeiting cryptography, and regulatory updates.
          </p>

          {subscribed ? (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>You're subscribed! We've sent a confirmation link to your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your work email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-blue focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-blue px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue/90 transition-all shadow-md shadow-blue/20 shrink-0"
              >
                Subscribe Free
              </button>
            </form>
          )}

          <p className="mt-3 text-[11px] text-muted">Zero spam. Unsubscribe anytime with one click.</p>
        </div>
      </section>
    </div>
  );
}
