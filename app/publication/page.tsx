import { Send, CheckCircle2, Clock, FileCheck, BookOpen, PenTool } from "lucide-react";

export default function PublicationPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Publication Status</h1>

        {/* Paper 1: Conference Accepted */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-green-200 dark:border-green-900/50 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            ACCEPTED
          </div>
          <div className="p-8 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              Evaluating the Trustworthiness of Bengali AI-Generated Health Advice Amid Cyberchondria Using Transformer-Based Explainable NLP Framework
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              Venue: <span className="font-semibold text-green-600 dark:text-green-400">BIM 2025 (Springer Lecture Notes)</span>
            </p>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-900/10 flex items-center gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Status: Accepted for Publication</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Expected Online: February 2026</p>
            </div>
          </div>
        </div>

        {/* Paper 2: Data Paper Under Review */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            UNDER REVIEW
          </div>
          <div className="p-8 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              Data Article: Evaluating the Trustworthiness of Bengali AI-Generated Health Advice Amid Cyberchondria Using Transformer-Based Explainable NLP Framework
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              Journal: <span className="font-semibold text-blue-600 dark:text-blue-400">Data in Brief (Elsevier)</span>
            </p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/10 flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 animate-pulse">
              <Send size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Status: Submitted & Under Review</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Awaiting reviewer feedback</p>
            </div>
          </div>
        </div>

        {/* Paper 3: Main Paper Draft */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative opacity-90">
           <div className="absolute top-0 right-0 bg-slate-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            DRAFTING
          </div>
          <div className="p-8 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              Bridging AI and Expert Insights: An XAI-Based Relevance Analysis of Bangla Health Summaries
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              Target Journal: <span className="font-semibold text-slate-600 dark:text-slate-300">eHealth (Elsevier)</span>
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
              <PenTool size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Status: Initial Draft</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Writing in progress</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
