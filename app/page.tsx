"use client";

import { useState, useMemo } from "react";
import { CheckCircle, AlertCircle, ShieldAlert, Activity, Loader2, Zap, Terminal } from "lucide-react";
import { clsx } from "clsx";

// --- TYPES ---
type Verdict = "Highly Relevant" | "Partially Relevant" | "Not Relevant";

interface APIResponse {
  label: Verdict;
  confidence: number;
  explanation: Array<[string, number]>;
}

// --- DATA STRUCTURE: GENRE -> PROMPT -> RESPONSES ---
// Extracted directly from your dataset
const DATASET = {
  "গ্যাস্ট্রিক": {
    "খাবার খেলেই বুক জ্বালা করে , কীভাবে এড়ানো যায়": [
      { type: "Highly Relevant", text: "খাওয়ার পর বুকের মাঝখানে জ্বালাপোড়া অনুভূত হয় , বিশেষ করে ভাজা খাবার খাওয়ার পর , তাই চর্বিযুক্ত এবং মশলাদার খাবার কমিয়ে হালকা খাবার পছন্দ করা উচিত" },
      { type: "Partially Relevant", text: "খাবার খাওয়ার পর বুক জ্বালাপোড়া হতে পারে, তবে এটি সাধারণত কিছুক্ষণের মধ্যে ঠিক হয়ে যায়। বেশি পানি পান করলে আরাম পাওয়া যেতে পারে।" },
      { type: "Not Relevant", text: "মনোযোগ ধরে রাখতে টেবিল গুছিয়ে রাখুন এবং অপ্রয়োজনীয় কাগজপত্র সরিয়ে ফেলুন। পরিষ্কার জায়গায় কাজ করলে চিন্তা-ভাবনা আরও গুছানো থাকে।" }
    ]
  },
  "স্যাস্থসচেতনা": {
    "হার্ট অ্যাটাকের লক্ষণ কী এবং তাৎক্ষণিক কী করা উচিত ?": [
      { type: "Highly Relevant", text: "হার্ট অ্যাটাকের প্রধান লক্ষণ হলো বুকে তীব্র ব্যথা, শ্বাসকষ্ট এবং ঘাম হওয়া। তাৎক্ষণিকভাবে রোগীকে অ্যাসপিরিন খাওয়ান এবং দ্রুত হাসপাতালে নিয়ে যান।" },
      { type: "Partially Relevant", text: "হার্ট অ্যাটাকের সময় বুকে ব্যথা হতে পারে। তবে গ্যাসের ব্যথাও একই রকম হতে পারে, তাই নিশ্চিত হওয়ার জন্য অ্যান্টাসিড খেয়ে দেখা যেতে পারে।" },
      { type: "Not Relevant", text: "সময় ব্যবস্থাপনা উন্নত করতে প্রতিদিনের কাজের একটি ছোট তালিকা তৈরি করুন। এতে কোন কাজটি আগে করবেন তা নির্ধারণ করা সহজ হয়।" }
    ]
  },
  "ডায়াবেটিস": {
    "ডায়াবেটিস নিয়ন্ত্রণে রাখার উপায় কি?": [
      { type: "Highly Relevant", text: "ডায়াবেটিস নিয়ন্ত্রণে রাখতে নিয়মিত ব্যায়াম করুন, শর্করা জাতীয় খাবার কম খান এবং চিকিৎসকের পরামর্শ অনুযায়ী ইনসুলিন বা ওষুধ গ্রহণ করুন।" },
      { type: "Partially Relevant", text: "ডায়াবেটিস হলে মিষ্টি খাওয়া কমিয়ে দিন। মাঝে মাঝে মিষ্টি খেলে খুব একটা ক্ষতি হয় না, তবে নিয়মিত হাঁটাচলা করা ভালো।" },
      { type: "Not Relevant", text: "পড়াশোনা বা কাজের ফাঁকে হালকা গান শোনা যেতে পারে। এতে একঘেয়েমি কমে এবং কাজে নতুন উদ্দীপনা আসে।" }
    ]
  },
  "উচ্চ রক্তচাপ": {
    "রক্তচাপ কমানোর জন্য কি কি খাবার খাওয়া উচিত?": [
      { type: "Highly Relevant", text: "উচ্চ রক্তচাপ কমাতে পটাশিয়াম সমৃদ্ধ খাবার যেমন কলা, ডাব, এবং সবুজ শাকসবজি খাওয়া উচিত। লবণ খাওয়া সম্পূর্ণ এড়িয়ে চলুন।" },
      { type: "Partially Relevant", text: "রক্তচাপ বাড়লে বিশ্রাম নিন। কিছু বিশেষ খাবার খেলে রক্তচাপ কমে, তবে ওষুধের ওপর পুরোপুরি নির্ভর করা ঠিক নয়।" },
      { type: "Not Relevant", text: "রাতে ঘুমানোর আগে এক গ্লাস দুধ পান করুন এবং এতে হলুদ মিশিয়ে নিন। এটি ঘুমের মান উন্নত করে।" }
    ]
  },
  "হৃদরোগ": {
    "হার্ট সুস্থ রাখার জন্য করণীয় কি?": [
      { type: "Highly Relevant", text: "হার্ট সুস্থ রাখতে ধুমপান ত্যাগ করুন, ওজন নিয়ন্ত্রণে রাখুন এবং প্রতিদিন অন্তত ৩০ মিনিট দ্রুত হাঁটুন।" },
      { type: "Partially Relevant", text: "হার্ট ভালো রাখতে তেল-চর্বি কম খান। মাঝে মাঝে ফাস্ট ফুড খেলে সমস্যা নেই, তবে নিয়মিত খাওয়া উচিত নয়।" },
      { type: "Not Relevant", text: "মাথাব্যথার জন্য কপালে ঠান্ডা পানির সেঁক দিন এবং অন্ধকার ঘরে বিশ্রাম নিন।" }
    ]
  },
  "ত্বকের সমস্যা": {
    "ত্বকের উজ্জ্বলতা বৃদ্ধির জন্য কি করা উচিত?": [
      { type: "Highly Relevant", text: "ত্বকের উজ্জ্বলতা বাড়াতে প্রচুর পানি পান করুন, রোদে বের হলে সানস্ক্রিন ব্যবহার করুন এবং নিয়মিত মুখ পরিষ্কার রাখুন।" },
      { type: "Partially Relevant", text: "ত্বক ফর্সা করতে বাজারে অনেক ক্রিম পাওয়া যায়। তবে প্রাকৃতিক উপাদান ব্যবহার করাই সবচেয়ে ভালো।" },
      { type: "Not Relevant", text: "চুল পড়া বন্ধ করতে নারকেল তেল বা অলিভ অয়েল মাথার ত্বকে মালিশ করুন।" }
    ]
  },
  "মানসিক স্বাস্থ্য": {
    "মানসিক চাপ কমানোর উপায় কি?": [
      { type: "Highly Relevant", text: "মানসিক চাপ কমাতে নিয়মিত যোগব্যায়াম বা মেডিটেশন করুন। পর্যাপ্ত ঘুম এবং সুষম খাবার মানসিক স্বাস্থ্যের জন্য জরুরি।" },
      { type: "Partially Relevant", text: "মন খারাপ থাকলে বন্ধুদের সাথে আড্ডা দিন। মাঝে মাঝে ঘুরতে গেলে মন ভালো থাকে, তবে এটা স্থায়ী সমাধান নয়।" },
      { type: "Not Relevant", text: "কোষ্ঠকাঠিন্যের সমস্যা থেকে মুক্তি পেতে প্রতিদিন সকালে ইসবগুলের ভুসি পানিতে মিশিয়ে খান।" }
    ]
  }
};

const GENRES = Object.keys(DATASET);

export default function Home() {
  const [genre, setGenre] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<APIResponse | null>(null);
  const [error, setError] = useState("");
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Derived state: Get prompts for selected genre
  const availablePrompts = useMemo(() => {
    return genre && DATASET[genre as keyof typeof DATASET] 
      ? Object.keys(DATASET[genre as keyof typeof DATASET]) 
      : [];
  }, [genre]);

  // Derived state: Get test cases for selected genre + prompt
  const testCases = useMemo(() => {
    if (genre && prompt && DATASET[genre as keyof typeof DATASET]) {
      const genreData = DATASET[genre as keyof typeof DATASET];
      // @ts-ignore - Dynamic access
      return genreData[prompt] || [];
    }
    return [];
  }, [genre, prompt]);

  const log = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const analyzeText = async () => {
    if (!response.trim()) {
      setError("Please enter an AI Response to verify.");
      return;
    }
    
    setLoading(true); setError(""); setResult(null); setDebugLogs([]);
    
    const TARGET_URL = "/api/predict";

    try {
      log("🚀 Starting Analysis...");
      
      const payload = {
        genre: genre.trim(),
        prompt: prompt.trim(),
        text: response.trim()
      };

      log(`📦 Payload: ${JSON.stringify(payload)}`);

      const res = await fetch(TARGET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server Error: ${txt}`);
      }

      const data = await res.json();
      log(`✅ Verdict: ${data.label}`);
      setResult(data);
    } catch (err: any) {
      log(`🔥 Error: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">MedGuard AI</h1>
          <p className="text-slate-500">Bangla Medical Response Verification System</p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FIELD 1: GENRE */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">1. Select Disease (রোগের ধরন)</label>
              <input 
                list="genre-options"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Start typing..."
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                  setPrompt(""); // Reset prompt when genre changes
                }}
              />
              <datalist id="genre-options">
                {GENRES.map((g, i) => <option key={i} value={g} />)}
              </datalist>
            </div>

            {/* FIELD 2: PROMPT */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">2. Select Prompt (ব্যবহারকারীর প্রশ্ন)</label>
              <input 
                list="prompt-options"
                disabled={!genre}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100 disabled:text-slate-400 transition-all"
                placeholder={genre ? "Select a question..." : "Select genre first"}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <datalist id="prompt-options">
                {availablePrompts.map((p, i) => <option key={i} value={p} />)}
              </datalist>
            </div>
          </div>

          {/* DYNAMIC TEST BUTTONS */}
          {testCases.length > 0 && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                3. Select a Test Case to Autofill:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {testCases.map((tc: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setResponse(tc.text)}
                    className={clsx(
                      "px-4 py-3 text-sm font-semibold rounded-lg border transition-all text-left shadow-sm hover:shadow-md",
                      tc.type === "Highly Relevant" && "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
                      tc.type === "Partially Relevant" && "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100",
                      tc.type === "Not Relevant" && "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {tc.type === "Highly Relevant" && <CheckCircle className="w-4 h-4" />}
                      {tc.type === "Partially Relevant" && <AlertCircle className="w-4 h-4" />}
                      {tc.type === "Not Relevant" && <ShieldAlert className="w-4 h-4" />}
                      {tc.type}
                    </div>
                    <div className="text-xs opacity-75 truncate">{tc.text}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FIELD 3: RESPONSE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">4. AI Response (এআই উত্তর)</label>
            <textarea
              className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
              placeholder="The response will appear here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </div>

          <button
            onClick={analyzeText}
            disabled={loading || !response}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:shadow-blue-300"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify Safety"}
          </button>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-medium">
              {error}
            </div>
          )}
        </div>

        {/* RESULT CARD */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
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
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={clsx("h-full rounded-full", item.isPositive ? "bg-green-500" : "bg-red-500")}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-sm">No specific keywords had a major impact.</p>
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