import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center px-4 overflow-hidden relative">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          System Operational v2.0
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight animate-fade-in-up delay-100">
          Trust Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Medical AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
          An advanced NLP framework protecting patients from hallucinated medical advice. 
          Verified by rigorous testing and adversarial robustness.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Link 
            href="/simulation"
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            Launch MedGuard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/methodology"
            className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold rounded-full transition-all flex items-center gap-2"
          >
            Read Methodology
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left animate-fade-in-up delay-500">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Shield className="w-10 h-10 text-indigo-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Safety First</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Filters dangerous or irrelevant medical responses with 90%+ accuracy.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Activity className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Real-time Analysis</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Instant verification using lightweight, optimized Transformer models.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Explainable AI</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Understand the 'Why' behind every verdict with visual LIME explanations.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}