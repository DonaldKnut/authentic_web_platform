"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Code2,
  Terminal,
  ShieldCheck,
  Zap,
  Key,
  Webhook,
  FileCheck,
  Search,
  Check,
  Copy,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Server,
  Play
} from "lucide-react";

type Language = "curl" | "typescript" | "python" | "json";

interface CodeSnippet {
  curl: string;
  typescript: string;
  python: string;
  json: string;
}

const docsCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Zap,
    description: "Connect your backend to AUTHENTIC in under 5 minutes.",
    snippets: {
      curl: `curl -X POST https://api.authentic.dev/v1/verify \\
  -H "Authorization: Bearer auth_live_9f823a" \\
  -H "Content-Type: application/json" \\
  -d '{"code": "AF-NG-8892-X"}'`,
      typescript: `import { AuthenticClient } from "@authentic/sdk";

const client = new AuthenticClient({ apiKey: process.env.AUTHENTIC_API_KEY });

const result = await client.verify({
  code: "AF-NG-8892-X",
  location: { lat: 6.5244, lng: 3.3792 }
});

console.log(result.isAuthentic, result.trustScore);`,
      python: `from authentic import Authentic

client = Authentic(api_key="auth_live_9f823a")

response = client.verify(
    code="AF-NG-8892-X",
    client_ip="197.210.64.1"
)

print(f"Status: {response.status}, Score: {response.trust_score}")`,
      json: `{
  "authentic": true,
  "code": "AF-NG-8892-X",
  "trustScore": 99.4,
  "status": "VERIFIED_GENUINE",
  "product": {
    "sku": "MED-GLUCO-500MG",
    "name": "Glucophage 500mg (100 Tabs)",
    "manufacturer": "PharmaCorp Global",
    "batch": "LOT-2026-09B",
    "expiry": "2028-12-31"
  },
  "scanCount": 1,
  "firstScannedAt": "2026-09-24T02:10:00Z"
}`
    }
  },
  {
    id: "identity-minting",
    name: "Identity Minting API",
    icon: Key,
    description: "Issue cryptographic ECC-256 serial numbers before packaging.",
    snippets: {
      curl: `curl -X POST https://api.authentic.dev/v1/mint \\
  -H "Authorization: Bearer auth_live_9f823a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "batchId": "BATCH-2026-904",
    "quantity": 1000,
    "sku": "MED-GLUCO-500MG"
  }'`,
      typescript: `const batch = await client.mintBatch({
  batchId: "BATCH-2026-904",
  quantity: 1000,
  sku: "MED-GLUCO-500MG",
  metadata: { factory: "Lagos Unit 4", line: "Packaging-Line-B" }
});

console.log("Minted Serials:", batch.serials.length);`,
      python: `batch = client.mint_batch(
    batch_id="BATCH-2026-904",
    quantity=1000,
    sku="MED-GLUCO-500MG"
)

for serial in batch.serials:
    print(serial.code, serial.qr_url)`,
      json: `{
  "success": true,
  "batchId": "BATCH-2026-904",
  "mintedCount": 1000,
  "signatureAlgorithm": "ECDSA_SHA256",
  "issuerPublicKey": "0x04bf3...92a1",
  "sampleSerial": "AF-NG-8892-X",
  "passportUrl": "https://authentic.dev/p/AF-NG-8892-X"
}`
    }
  },
  {
    id: "trust-score",
    name: "Trust Score Engine",
    icon: ShieldCheck,
    description: "How our multi-factor scoring engine calculates item risk.",
    snippets: {
      curl: `curl -X GET https://api.authentic.dev/v1/trust-score/AF-NG-8892-X \\
  -H "Authorization: Bearer auth_live_9f823a"`,
      typescript: `const trustData = await client.getTrustScore("AF-NG-8892-X");

if (trustData.riskLevel === "HIGH") {
  console.warn("Flagged for manual inspection:", trustData.reasons);
}`,
      python: `trust_data = client.get_trust_score("AF-NG-8892-X")

if trust_data.risk_level == "HIGH":
    trigger_counterfeit_alert(trust_data)`,
      json: `{
  "code": "AF-NG-8892-X",
  "trustScore": 99.4,
  "riskLevel": "LOW",
  "factors": [
    { "name": "Cryptographic Signature", "passed": true, "weight": 40 },
    { "name": "First Scan Geolocation", "passed": true, "weight": 25 },
    { "name": "Batch Expiry & Recall Status", "passed": true, "weight": 20 },
    { "name": "Scan Frequency Velocity", "passed": true, "weight": 15 }
  ]
}`
    }
  },
  {
    id: "webhooks",
    name: "Webhooks & Fraud Alerts",
    icon: Webhook,
    description: "Receive real-time push alerts when suspicious scans occur.",
    snippets: {
      curl: `curl -X POST https://api.authentic.dev/v1/webhooks \\
  -H "Authorization: Bearer auth_live_9f823a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://api.yourcompany.com/authentic-events",
    "events": ["scan.counterfeit_flagged", "batch.recalled"]
  }'`,
      typescript: `// Express / Next.js API Webhook Handler
export async function POST(req: Request) {
  const event = client.webhooks.constructEvent(
    await req.text(),
    req.headers.get("x-authentic-signature")!
  );

  if (event.type === "scan.counterfeit_flagged") {
    console.log("Counterfeit attempt detected:", event.data.code);
  }
}`,
      python: `@app.route('/webhooks', methods=['POST'])
def handle_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('X-Authentic-Signature')
    
    event = client.webhooks.verify(payload, sig_header)
    if event.type == "scan.counterfeit_flagged":
        notify_security_team(event.data)
    return '', 200`,
      json: `{
  "eventId": "evt_99812401",
  "type": "scan.counterfeit_flagged",
  "timestamp": "2026-09-24T02:12:00Z",
  "data": {
    "code": "AF-NG-9999-FAKE",
    "reason": "MULTIPLE_GEO_SCANS_IN_5_MINUTES",
    "location": "Lagos, Nigeria",
    "scanCount": 142
  }
}`
    }
  },
  {
    id: "dpp-export",
    name: "EU Digital Product Passport",
    icon: FileCheck,
    description: "Generate ISO 27001 & EU DPP compliant JSON-LD schemas.",
    snippets: {
      curl: `curl -X GET https://api.authentic.dev/v1/passport/AF-NG-8892-X/dpp \\
  -H "Accept: application/ld+json"`,
      typescript: `const dppPassport = await client.getDigitalProductPassport("AF-NG-8892-X");

console.log("EU Compliance Identifier:", dppPassport.id);
console.log("Carbon Footprint:", dppPassport.sustainability.co2eKg);`,
      python: `dpp = client.get_dpp("AF-NG-8892-X")
print("Recyclability Score:", dpp.sustainability.recyclable_pct)`,
      json: `{
  "@context": "https://w3id.org/dpp/v1",
  "id": "urn:authentic:dpp:AF-NG-8892-X",
  "type": "DigitalProductPassport",
  "issuedBy": "PharmaCorp Global",
  "compliance": ["EU_DPP_2026", "ISO_27001"],
  "sustainability": {
    "co2eKg": 0.42,
    "recyclablePct": 98.5,
    "packagingMaterial": "Recycled Aluminum & FSC Cardboard"
  },
  "provenance": {
    "originCountry": "Nigeria",
    "facilityId": "FAC-LOS-004"
  }
}`
    }
  }
];

export function DocsPortal() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [language, setLanguage] = useState<Language>("typescript");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationOutput, setSimulationOutput] = useState<string | null>(null);

  const currentCat = docsCategories.find((c) => c.id === activeCategory) || docsCategories[0];

  const filteredCategories = docsCategories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationOutput(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationOutput(currentCat.snippets.json);
    }, 600);
  };

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-12">
      {/* Search Header */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl border border-line bg-elev/80 p-4 md:p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-syne text-lg font-bold text-ink">Developer Reference Portal</h3>
            <p className="text-xs text-muted">Complete REST API, SDK specs, and integration guides</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search API docs, webhooks, DPP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-line bg-surface py-2 pl-10 pr-4 text-xs text-ink placeholder:text-muted focus:border-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid: Sidebar & Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-4 space-y-3">
          <div className="rounded-3xl border border-line bg-elev p-5 shadow-sm">
            <h4 className="px-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-4">
              Documentation Modules
            </h4>
            <nav className="space-y-1">
              {filteredCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSimulationOutput(null);
                    }}
                    className={`w-full text-left flex items-start gap-3 rounded-2xl p-3.5 transition-all text-xs ${
                      isActive
                        ? "bg-blue/10 border border-blue/30 text-ink font-semibold shadow-xs"
                        : "hover:bg-surface text-muted hover:text-ink"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${isActive ? "text-blue" : "text-muted"}`} />
                    <div>
                      <div className="font-medium leading-snug">{cat.name}</div>
                      <div className="text-[11px] text-muted line-clamp-1 mt-0.5">{cat.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick API Keys Callout */}
          <div className="rounded-3xl border border-blue/20 bg-soft-blue/40 p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue">
              <Sparkles className="h-4 w-4" />
              <span>Need Sandbox Credentials?</span>
            </div>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Test queries with instant test keys on <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] text-blue">auth_test_demo</code>.
            </p>
            <Button href="/get-started" variant="secondary" className="mt-4 w-full text-xs py-2">
              Generate Free API Key
            </Button>
          </div>
        </aside>

        {/* Right Main Viewer */}
        <main className="lg:col-span-8 space-y-6">
          {/* Active Module Header */}
          <div className="rounded-3xl border border-line bg-elev p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <span className="rounded-full bg-blue/10 px-3 py-1 text-[11px] font-mono font-semibold text-blue">
                  Module: {currentCat.id}
                </span>
                <h2 className="font-syne text-2xl font-bold text-ink mt-3">{currentCat.name}</h2>
                <p className="mt-1 text-sm text-muted">{currentCat.description}</p>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
                {(["typescript", "curl", "python", "json"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all uppercase ${
                      language === lang
                        ? "bg-blue text-white shadow-xs"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {lang === "typescript" ? "TS/JS" : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Block Container */}
            <div className="mt-6 rounded-2xl border border-line bg-[#0B132B] text-slate-100 overflow-hidden font-mono text-xs">
              {/* Top Code Bar */}
              <div className="flex items-center justify-between bg-[#1C2541] px-4 py-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] text-slate-400">
                    {language === "curl"
                      ? "terminal"
                      : language === "typescript"
                      ? "index.ts"
                      : language === "python"
                      ? "verify.py"
                      : "payload.json"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(currentCat.snippets[language])}
                    className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/20 transition-all"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied" : "Copy Code"}</span>
                  </button>

                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className="flex items-center gap-1.5 rounded-lg bg-blue px-3 py-1 text-[11px] text-white font-sans font-medium hover:bg-blue/90 transition-all disabled:opacity-50"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isSimulating ? "Running..." : "Test Request"}</span>
                  </button>
                </div>
              </div>

              {/* Code Display */}
              <pre className="p-5 overflow-x-auto text-slate-200 leading-relaxed font-mono">
                <code>{currentCat.snippets[language]}</code>
              </pre>
            </div>

            {/* Interactive Simulation Result */}
            {simulationOutput && (
              <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 font-mono text-xs animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-emerald-400 mb-2 font-bold font-sans">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    HTTP 200 OK — Live Sandbox Response (18ms)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Content-Type: application/json</span>
                </div>
                <pre className="p-3 bg-[#0B132B] rounded-xl text-slate-200 overflow-x-auto">
                  <code>{simulationOutput}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Core Endpoints Quick Sheet */}
          <div className="rounded-3xl border border-line bg-elev p-6 shadow-sm">
            <h3 className="font-syne text-lg font-bold text-ink mb-4">REST API Endpoints Overview</h3>
            <div className="grid gap-3">
              {[
                { method: "POST", path: "/v1/verify", desc: "Verify any serial code or QR cryptographic payload" },
                { method: "POST", path: "/v1/mint", desc: "Batch issue sealed ECC-256 identities" },
                { method: "GET", path: "/v1/trust-score/{code}", desc: "Fetch real-time Trust Score details and risk flags" },
                { method: "GET", path: "/v1/passport/{code}", desc: "Fetch public product passport & provenance trail" },
                { method: "POST", path: "/v1/webhooks", desc: "Register real-time fraud alert endpoints" }
              ].map((ep) => (
                <div key={ep.path} className="flex flex-col md:flex-row md:items-center justify-between gap-2 rounded-2xl border border-line bg-surface p-4 text-xs hover:border-blue/30 transition-all">
                  <div className="flex items-center gap-3 font-mono">
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                      ep.method === "POST" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue/10 text-blue"
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-semibold text-ink">{ep.path}</span>
                  </div>
                  <span className="text-muted text-xs">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
