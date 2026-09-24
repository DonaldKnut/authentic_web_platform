"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Code2,
  Terminal,
  Play,
  Copy,
  Check,
  Zap,
  Sparkles,
  ArrowRight,
  Server
} from "lucide-react";

type Lang = "typescript" | "curl" | "python" | "go" | "webhook";

interface Snippet {
  code: string;
  response: string;
  filename: string;
}

const snippets: Record<Lang, Snippet> = {
  typescript: {
    filename: "verify.ts",
    code: `import { Authentic } from "@authentic/sdk";

const client = new Authentic({ apiKey: process.env.AUTHENTIC_API_KEY });

// Verify physical item serial code
const result = await client.verify({
  code: "AF-NG-8892-X",
  source: "RETAIL_POS_CHECKOUT",
  clientIp: "197.210.64.1"
});

if (result.isAuthentic) {
  console.log(\`Verified Genuine! Trust Score: \${result.trustScore}/100\`);
} else {
  console.warn(\`Flagged: \${result.riskLevel} - \${result.flaggedReason}\`);
}`,
    response: `{
  "authentic": true,
  "code": "AF-NG-8892-X",
  "trustScore": 98.6,
  "status": "VERIFIED_GENUINE",
  "product": {
    "sku": "MED-GLUCO-500MG",
    "name": "Glucophage 500mg (100 Tabs)",
    "manufacturer": "PharmaCorp Global PLC",
    "batch": "LOT-2026-09B",
    "expiry": "2028-12-31"
  },
  "signatureVerified": true,
  "scanCount": 1,
  "latencyMs": 14
}`
  },
  curl: {
    filename: "terminal",
    code: `curl -X POST https://api.authentic.dev/v1/verify \\
  -H "Authorization: Bearer auth_live_9f823a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "AF-NG-8892-X",
    "source": "MOBILE_SCANNER"
  }'`,
    response: `{
  "authentic": true,
  "code": "AF-NG-8892-X",
  "trustScore": 98.6,
  "status": "VERIFIED_GENUINE",
  "product": {
    "sku": "MED-GLUCO-500MG",
    "name": "Glucophage 500mg (100 Tabs)",
    "manufacturer": "PharmaCorp Global PLC"
  },
  "signatureVerified": true,
  "latencyMs": 12
}`
  },
  python: {
    filename: "verify.py",
    code: `from authentic import AuthenticClient

client = AuthenticClient(api_key="auth_live_9f823a")

response = client.verify_code(
    code="AF-NG-8892-X",
    source="ECOMMERCE_CHECKOUT"
)

print(f"Status: {response.status}")
print(f"Trust Score: {response.trust_score}")`,
    response: `{
  "authentic": True,
  "code": "AF-NG-8892-X",
  "trust_score": 98.6,
  "status": "VERIFIED_GENUINE",
  "latency_ms": 15
}`
  },
  go: {
    filename: "main.go",
    code: `package main

import (
    "fmt"
    "github.com/authentic/authentic-go"
)

func main() {
    client := authentic.NewClient("auth_live_9f823a")
    res, err := client.Verify("AF-NG-8892-X")
    if err != nil {
        panic(err)
    }
    fmt.Printf("Authentic: %v, Score: %.1f\\n", res.Authentic, res.TrustScore)
}`,
    response: `{
  "authentic": true,
  "code": "AF-NG-8892-X",
  "trustScore": 98.6,
  "status": "VERIFIED_GENUINE",
  "latencyMs": 11
}`
  },
  webhook: {
    filename: "webhook-event.json",
    code: `// Real-Time Fraud Alert Payload (HTTP POST to your webhook URL)
{
  "eventId": "evt_99812401",
  "type": "scan.counterfeit_flagged",
  "timestamp": "2026-09-24T02:37:00Z",
  "data": {
    "code": "AF-NG-9999-CLONED",
    "reason": "GEOGRAPHIC_VELOCITY_ANOMALY",
    "scanCount": 142,
    "locationsDetected": ["Lagos, NG", "London, UK"]
  }
}`,
    response: `{
  "received": true,
  "actionTaken": "ALERT_SECURITY_DISPATCH_TRIGGERED",
  "timestamp": "2026-09-24T02:37:00.012Z"
}`
  }
};

export function PlatformCodeSandbox() {
  const [lang, setLang] = useState<Lang>("typescript");
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);

  const current = snippets[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsSimulating(true);
    setSimulatedResponse(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedResponse(current.response);
    }, 500);
  };

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-16">
      <div className="rounded-3xl border border-line bg-elev p-6 md:p-10 shadow-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-3.5 py-1 text-xs font-mono font-bold text-blue">
              <Terminal className="h-4 w-4" />
              <span>LIVE API PLAYGROUND</span>
            </div>
            <h3 className="font-syne text-2xl font-bold text-ink mt-2">
              Embed Verification in Any Tech Stack
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              Sub-18ms response times guaranteed across all REST API & SDK queries.
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex flex-wrap items-center gap-1 rounded-2xl border border-line bg-surface p-1.5">
            {(["typescript", "curl", "python", "go", "webhook"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setSimulatedResponse(null);
                }}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold transition-all uppercase ${
                  lang === l
                    ? "bg-blue text-white shadow-md shadow-blue/20"
                    : "text-muted hover:text-ink"
                }`}
              >
                {l === "typescript" ? "TS / JS" : l}
              </button>
            ))}
          </div>
        </div>

        {/* Code View Area */}
        <div className="mt-6 rounded-2xl border border-line bg-[#0B132B] text-slate-100 overflow-hidden font-mono text-xs shadow-2xl">
          {/* Bar */}
          <div className="flex items-center justify-between bg-[#1C2541] px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[11px] text-slate-400">{current.filename}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1 text-[11px] text-slate-300 hover:bg-white/20 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </button>

              <button
                onClick={handleRun}
                disabled={isSimulating}
                className="flex items-center gap-1.5 rounded-lg bg-blue px-3.5 py-1 text-[11px] text-white font-sans font-bold hover:bg-blue/90 transition-all disabled:opacity-50 shadow-md shadow-blue/30"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>{isSimulating ? "Executing..." : "Send Request"}</span>
              </button>
            </div>
          </div>

          {/* Code */}
          <pre className="p-6 overflow-x-auto text-slate-200 leading-relaxed font-mono">
            <code>{current.code}</code>
          </pre>
        </div>

        {/* Output */}
        {simulatedResponse && (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 font-mono text-xs animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-emerald-400 mb-2 font-sans font-bold">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                HTTP 200 OK — Verification Result (14ms)
              </span>
              <span className="text-[11px] font-mono text-slate-400">Content-Type: application/json</span>
            </div>
            <pre className="p-4 bg-[#0B132B] rounded-xl text-slate-200 overflow-x-auto border border-emerald-500/20">
              <code>{simulatedResponse}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
