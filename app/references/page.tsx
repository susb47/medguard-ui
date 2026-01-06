import { BookOpen, ExternalLink } from "lucide-react";

export default function ReferencesPage() {
  const references = [
    {
      id: 1,
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Devlin, J., Chang, M. W., Lee, K., & Toutanova, K.",
      year: "2018",
      source: "arXiv preprint arXiv:1810.04805",
      link: "https://arxiv.org/abs/1810.04805"
    },
    {
      id: 2,
      title: "Explaining and Harnessing Adversarial Examples",
      authors: "Goodfellow, I. J., Shlens, J., & Szegedy, C.",
      year: "2014",
      source: "International Conference on Learning Representations (ICLR)",
      link: "https://arxiv.org/abs/1412.6572"
    },
    {
      id: 3,
      title: "BanglaBERT: Language Model Pretraining and Benchmarks for Low-Resource Language Understanding",
      authors: "Bhattacharjee, A., et al.",
      year: "2022",
      source: "Findings of the Association for Computational Linguistics: NAACL 2022",
      link: "https://aclanthology.org/2022.findings-naacl.98/"
    },
    {
      id: 4,
      title: "\"Why Should I Trust You?\": Explaining the Predictions of Any Classifier",
      authors: "Ribeiro, M. T., Singh, S., & Guestrin, C.",
      year: "2016",
      source: "Proceedings of the 22nd ACM SIGKDD International Conference",
      link: "https://arxiv.org/abs/1602.04938"
    },
    {
      id: 5,
      title: "Adversarial Training for High-Stakes Reliability",
      authors: "Madry, A., Makelov, A., Schmidt, L., Tsipras, D., & Vladu, A.",
      year: "2017",
      source: "International Conference on Learning Representations",
      link: "https://arxiv.org/abs/1706.06083"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">References</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Key academic papers and resources that formed the foundation of the MedGuard architecture.
        </p>

        <div className="space-y-6">
          {references.map((ref) => (
            <div key={ref.id} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="mt-1 min-w-[24px] text-slate-400 font-mono text-sm">
                    [{ref.id}]
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {ref.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm italic">
                      {ref.authors} ({ref.year})
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      {ref.source}
                    </p>
                  </div>
                </div>
                <a 
                  href={ref.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}