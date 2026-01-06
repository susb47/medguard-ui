export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 md:p-24">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Methodological System
        </h1>
        <h2 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-8">
          Bridging AI and Expert Insights: An XAI-Based Relevance Analysis
        </h2>
        
        <p className="lead text-lg text-slate-600 dark:text-slate-400 mb-8">
          Our research framework addresses the critical gap between AI-generated health advice and medical accuracy in the context of the Bengali language. We utilize a human-in-the-loop approach combined with Explainable AI (XAI) to mitigate cyberchondria.
        </p>

        <div className="space-y-8">
          {/* Phase 1 */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              1. Dataset Development & Annotation
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              We constructed a specialized dataset of Bangla health summaries. Unlike generic corpora, this dataset was rigorously annotated by medical experts (Resident Physicians) to establish a "Ground Truth" for relevance. The annotations categorize responses into <strong>Highly Relevant</strong>, <strong>Partially Relevant</strong>, and <strong>Not Relevant</strong> based on clinical safety.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              2. Transformer-Based Classification
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              We fine-tuned <strong>BanglaBERT</strong> and other multilingual transformers (mBERT, XLM-R) to classify the relevance of health advice. We implemented <strong>Adversarial Training (FGM)</strong> to robustify the model against noise and minor textual perturbations, ensuring high reliability in real-world scenarios.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              3. Explainable AI (XAI) Integration
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              To bridge the "Black Box" gap, we integrated <strong>LIME (Local Interpretable Model-agnostic Explanations)</strong>. This layer highlights the specific Bangla keywords (e.g., specific symptoms or medications) that influenced the AI's verdict, allowing users and doctors to trust the system's reasoning.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}