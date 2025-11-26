"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, ShieldAlert, Activity, Loader2, Terminal, Zap } from "lucide-react";
import { clsx } from "clsx";

// --- TYPES ---
type Verdict = "Highly Relevant" | "Partially Relevant" | "Not Relevant";

interface APIResponse {
  label: Verdict;
  confidence: number;
  explanation: Array<[string, number]>; // LIME features
}

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<APIResponse | null>(null);
  const [error, setError] = useState("");
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const log = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
    console.log(`[MedGuard Debug] ${msg}`);
  };

  const analyzeText = async () => {
    if (!input.trim()) return;
    setLoading(true); setError(""); setResult(null); setDebugLogs([]);
    
    // FIX: Use the internal Next.js proxy path.
    // This sends the request to Next.js (port 3000), which forwards it to Python (port 8000).
    // This avoids CORS and Port Forwarding issues.
    const TARGET_URL = "/api/predict";

    try {
      log("🚀 Starting Analysis...");
      log(`🎯 Target: ${TARGET_URL} (Proxy to Backend)`);
      
      const response = await fetch(TARGET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        const txt = await response.text();
        // Check if we got HTML back (which means the proxy failed to reach Python)
        if (txt.trim().startsWith("<!DOCTYPE html>")) {
          throw new Error("Proxy Error: Next.js could not reach the Python Backend. Is 'uvicorn' running on port 8000?");
        }
        throw new Error(`Server Error: ${txt}`);
      }

      const data = await response.json();
      log(`✅ Verdict: ${data.label}`);
      setResult(data);
    } catch (err: any) {
      log(`🔥 Error: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- SMART SCALING LOGIC ---
  const processExplanation = (explanation: Array<[string, number]>) => {
    if (!explanation || explanation.length === 0) return [];
    const maxWeight = Math.max(...explanation.map(e => Math.abs(e[1])));
    if (maxWeight === 0) return []; 

    return explanation.map(([word, weight]) => {
      const score = (Math.abs(weight) / maxWeight) * 100;
      return { word, weight, score, isPositive: weight > 0 };
    })
    .filter(item => item.score > 5) 
    .sort((a, b) => b.score - a.score); 
  };

  const processedExp = result ? processExplanation(result.explanation) : [];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">MedGuard AI</h1>
          <p className="text-slate-500">Bangla Medical Response Verification System</p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <textarea
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-lg"
            placeholder="Enter medical advice here (Bangla)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={analyzeText}
            disabled={loading || !input}
            className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify Safety"}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-medium">
              {error}
            </div>
          )}
        </div>

        {/* RESULT CARD */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
            {/* VERDICT BANNER */}
            <div className={clsx(
              "p-6 rounded-2xl border-l-8 flex items-center gap-4 shadow-sm",
              result.label === "Highly Relevant" && "bg-green-50 border-green-500 text-green-900",
              result.label === "Partially Relevant" && "bg-yellow-50 border-yellow-500 text-yellow-900",
              result.label === "Not Relevant" && "bg-red-50 border-red-500 text-red-900",
            )}>
              {result.label === "Highly Relevant" && <CheckCircle className="w-8 h-8 text-green-600" />}
              {result.label === "Partially Relevant" && <AlertCircle className="w-8 h-8 text-yellow-600" />}
              {result.label === "Not Relevant" && <ShieldAlert className="w-8 h-8 text-red-600" />}
              
              <div>
                <h2 className="text-2xl font-bold">{result.label}</h2>
                <p className="opacity-80">Confidence: {result.confidence}%</p>
              </div>
            </div>

            {/* EXPLAINABILITY (SMART SCORING) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" /> Key Influencing Words
              </h3>
              
              {processedExp.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {processedExp.map((item, i) => (
                    <div key={i} className="flex flex-col p-3 rounded-lg border bg-slate-50">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-800">{item.word}</span>
                        <span className={clsx(
                          "text-xs font-bold",
                          item.isPositive ? "text-green-600" : "text-red-600"
                        )}>
                          {item.isPositive ? "Supports" : "Opposes"}
                        </span>
                      </div>
                      
                      {/* Impact Bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={clsx("h-full rounded-full", item.isPositive ? "bg-green-500" : "bg-red-500")}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-[10px] text-slate-400">Impact: {item.score.toFixed(0)}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-sm">No specific keywords had a major impact on this decision.</p>
              )}
            </div>

          </div>
        )}

        {/* DEBUG CONSOLE */}
        <div className="mt-8 bg-slate-900 rounded-xl p-4 text-xs font-mono text-green-400 overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2 text-slate-400">
            <Terminal className="w-4 h-4" /> System Logs
          </div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {debugLogs.map((log, i) => <div key={i}>{log}</div>)}
          </div>
        </div>

      </div>
    </main>
  );
}