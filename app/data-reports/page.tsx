import { BarChart3, PieChart, FileText, Download, Database } from "lucide-react";

export default function DataReportsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 md:p-24">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Data Reports & Statistics</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive analysis of the <strong>BanHealthAI-v3</strong> dataset used to train and validate the MedGuard system.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <Database size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Samples</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">15,384</h3>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Unique Prompts</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">4,120</h3>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Classes</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3 Categories</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Class Distribution (Visual Mockup) */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <PieChart className="text-slate-400" /> Class Distribution
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-700 dark:text-slate-300">Highly Relevant</span>
                <span className="text-slate-500 dark:text-slate-500">33.4%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: "33.4%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-700 dark:text-slate-300">Partially Relevant</span>
                <span className="text-slate-500 dark:text-slate-500">32.1%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: "32.1%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-700 dark:text-slate-300">Not Relevant</span>
                <span className="text-slate-500 dark:text-slate-500">34.5%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: "34.5%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
            <Download size={18} /> Download Full Dataset (CSV)
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-all">
            <FileText size={18} /> Read Data Paper
          </button>
        </div>

      </div>
    </div>
  );
}