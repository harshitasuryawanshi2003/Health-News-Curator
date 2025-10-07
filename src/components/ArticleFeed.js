import { useState, useRef } from 'react';
import { Loader2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleCard } from './ArticleCard';

export const ArticleFeed = ({ articles, onArticleClick, onRefresh, articlesPerPage = 4 }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const startY = useRef(0);
  const containerRef = useRef(null);

  const PULL_THRESHOLD = 80;

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (isRefreshing || containerRef.current?.scrollTop !== 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;

    if (distance > 0) {
      setIsPulling(true);
      setPullDistance(Math.min(distance * 0.5, PULL_THRESHOLD * 1.2));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  const handleMouseDown = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.clientY;
      setIsPulling(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isPulling || isRefreshing || containerRef.current?.scrollTop !== 0) return;

    const currentY = e.clientY;
    const distance = currentY - startY.current;

    if (distance > 0) {
      setPullDistance(Math.min(distance * 0.5, PULL_THRESHOLD * 1.2));
    } else {
      setIsPulling(false);
      setPullDistance(0);
    }
  };

  const handleMouseUp = async () => {
    if (!isPulling) return;

    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {(isPulling || isRefreshing) && (
          <div className="flex justify-center py-4">
            <div
              className="flex items-center gap-2 text-emerald-600"
              style={{ opacity: Math.min(pullDistance / PULL_THRESHOLD, 1) }}
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">Refreshing...</span>
                </>
              ) : (
                <>
                  <RefreshCw
                    className="w-5 h-5"
                    style={{ transform: `rotate(${pullDistance * 2}deg)` }}
                  />
                  <span className="text-sm font-medium">
                    {pullDistance >= PULL_THRESHOLD ? 'Release to refresh' : 'Pull to refresh'}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-5 pb-32">
          {currentArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:hover:bg-emerald-50"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:hover:bg-emerald-50"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 text-center text-sm text-slate-500">
              Showing {startIndex + 1}-{Math.min(endIndex, articles.length)} of {articles.length} articles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
