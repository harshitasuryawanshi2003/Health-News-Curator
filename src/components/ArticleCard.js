import { Calendar, Tag } from 'lucide-react';

export const ArticleCard = ({ article, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 hover:border-emerald-200"
    >
      <div className="aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
            <Tag className="w-3.5 h-3.5" />
            {article.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2 leading-snug">
          {article.title}
        </h3>

        <p className="text-sm text-slate-500 font-medium">
          {article.source}
        </p>

        {article.summary && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-600 font-medium mb-3 italic">
              {article.summary.tldr}
            </p>
            <div className="space-y-2">
              {article.summary.keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex gap-2 text-xs text-slate-600">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span className="flex-1">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
