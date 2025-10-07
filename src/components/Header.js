import { Newspaper } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">HealthCurate</h1>
            <p className="text-xs text-slate-500">AI-Powered Health News</p>
          </div>
        </div>
      </div>
    </header>
  );
};
