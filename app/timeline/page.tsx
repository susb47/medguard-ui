export default function TimelinePage() {
  const events = [
    { 
      date: "Jan 2025", 
      title: "Problem Definition", 
      desc: "Identified the rise of Cyberchondria and the lack of reliable Bangla medical AI verification tools." 
    },
    { 
      date: "Mar 2025", 
      title: "Data Collection & Annotation", 
      desc: "Compiled health queries and collaborated with Dr. Debashish Biswas for expert labelling." 
    },
    { 
      date: "Jul 2025", 
      title: "Model Development", 
      desc: "Fine-tuned BanglaBERT and implemented Adversarial Training strategies." 
    },
    { 
      date: "Oct 2025", 
      title: "XAI Integration", 
      desc: "Developed the LIME-based explainability layer to visualize model decisions." 
    },
    { 
      date: "Dec 2025", 
      title: "System Evaluation", 
      desc: "Final testing, ablation studies, and UI development for the MedGuard platform." 
    },
    { 
      date: "Jan 7, 2026", 
      title: "Final Defense", 
      desc: "Successfully presented the Final Year Design Project report at Daffodil International University." 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 md:p-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Project Timeline</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-12">From concept to defense: The journey of MedGuard.</p>
        
        <div className="space-y-8 border-l-2 border-slate-200 dark:border-slate-800 pl-8 ml-4">
          {events.map((e, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[39px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-950 group-hover:scale-110 transition-transform"></div>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{e.date}</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{e.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}