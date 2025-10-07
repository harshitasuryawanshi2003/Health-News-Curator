import { useState } from 'react';
import { ArrowLeft, Calendar, Tag, Sparkles, Loader2, Languages, FileText, BookOpen } from 'lucide-react';
import { generateSummary, generateSimplifiedRewrite } from '../services/aiService';
import { LANGUAGES } from '../config/languages';

export const ArticleDetail = ({ article: initialArticle, onBack }) => {
  const [article, setArticle] = useState(initialArticle);
  const [viewMode, setViewMode] = useState('full');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingSimplified, setIsGeneratingSimplified] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const summary = await generateSummary(article.fullContent, selectedLanguage);
      setArticle({ ...article, summary });
      setViewMode('summary');
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGenerateSimplified = async () => {
    setIsGeneratingSimplified(true);
    try {
      const simplifiedResponse = await generateSimplifiedRewrite(article.fullContent, selectedLanguage);
      setArticle({ ...article, simplifiedVersion: simplifiedResponse.simplifiedText });
      setViewMode('simplified');
    } catch (error) {
      console.error('Failed to generate simplified version:', error);
    } finally {
      setIsGeneratingSimplified(false);
    }
  };

  const handleLanguageChange = async (lang) => {
    setSelectedLanguage(lang);
    setShowLanguageSelector(false);

    if (viewMode === 'summary' && article.summary) {
      setIsGeneratingSummary(true);
      const summary = await generateSummary(article.fullContent, lang);
      setArticle({ ...article, summary });
      setIsGeneratingSummary(false);
    } else if (viewMode === 'simplified' && article.simplifiedVersion) {
      setIsGeneratingSimplified(true);
      const simplifiedResponse = await generateSimplifiedRewrite(article.fullContent, lang);
      setArticle({ ...article, simplifiedVersion: simplifiedResponse.simplifiedText });
      setIsGeneratingSimplified(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Feed</span>
            </button>

            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm">
                {LANGUAGES.find(l => l.code === selectedLanguage)?.name}
              </span>
            </button>
          </div>

          {showLanguageSelector && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedLanguage === lang.code
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg mb-6">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
            <Tag className="w-4 h-4" />
            {article.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
          {article.title}
        </h1>

        <p className="text-slate-600 font-medium mb-6">
          {article.source}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setViewMode('full')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              viewMode === 'full'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            Full Article
          </button>

          <button
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              viewMode === 'summary'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isGeneratingSummary ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                AI Summary
              </>
            )}
          </button>

          <button
            onClick={handleGenerateSimplified}
            disabled={isGeneratingSimplified}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              viewMode === 'simplified'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isGeneratingSimplified ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                Simplified
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {viewMode === 'full' && (
            <div className="prose prose-slate max-w-none">
              {article.fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {viewMode === 'summary' && article.summary && (
            <div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-100">
                <h3 className="text-sm font-semibold text-emerald-900 mb-3 uppercase tracking-wide">
                  TL;DR
                </h3>
                <p className="text-base text-slate-800 leading-relaxed font-medium">
                  {article.summary.tldr}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                  Key Takeaways
                </h3>
                <div className="space-y-4">
                  {article.summary.keyTakeaways.map((takeaway, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="flex-1 text-slate-700 leading-relaxed pt-1">
                        {takeaway}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'simplified' && article.simplifiedVersion && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-emerald-700 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  Easy-to-Understand Version
                </span>
              </div>
              {article.simplifiedVersion.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
