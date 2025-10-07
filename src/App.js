import { useState } from 'react';
import { Header } from './components/Header';
import { ArticleFeed } from './components/ArticleFeed';
import { ArticleDetail } from './components/ArticleDetail';
import { mockArticles } from './data/mockArticles';

function App() {
  const [articles, setArticles] = useState(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const shuffledArticles = [...mockArticles].sort(() => Math.random() - 0.5);
    setArticles(shuffledArticles);

  };


  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBack = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <ArticleFeed
        articles={articles}
        onArticleClick={handleArticleClick}
        onRefresh={handleRefresh}
      />
    </div>
  );
}

export default App;
