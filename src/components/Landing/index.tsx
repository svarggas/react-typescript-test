import type { FC } from 'react';
import { useCallback, useState } from 'react';
import Card from '../Card';
import SortBy from '../SortBy';
import Pagination from '../Pagination';
import { useArticles } from '../../context/ArticlesContext';
import LoadingSpinner from '../LoadingSpinner';
import MainLayout from '../../layout/MainLayout';
import type { SortOptions } from '../../models/sortOptions';

import '../../styles/Container.css';
import './style.css';

const Landing: FC = () => {
  const [sortBy, setSortBy] = useState<SortOptions>('popularity');
  const {
    articles = [],
    loading,
    error,
    refetch,
    currentPage,
    totalPages,
    goToPage,
    pagination,
  } = useArticles();

  const sortByOptions = [
    {
      label: 'Popularity',
      value: 'popularity',
    },
    {
      label: 'Published Date (Newest)',
      value: 'published_desc',
    },
    {
      label: 'Published Date (Oldest)',
      value: 'published_asc',
    },
  ];

  const handleSortOnChange = (value: string) => {
    const options = value as SortOptions;
    setSortBy(options);
    // Reset to page 1 when changing sort
    refetch(options, 1);
  };

  const handleRetry = useCallback(() => {
    if (refetch) {
      refetch(sortBy, currentPage);
    } else {
      window.location.reload();
    }
  }, [refetch, sortBy, currentPage]);

  const renderContent = () => {
    if (loading) {
      return (
        <span className="centerContainer">
          <LoadingSpinner />
        </span>
      );
    }

    if (error) {
      return (
        <div className="error-message">
          <p>Error loading articles: {error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      );
    }

    if (!articles.length) {
      return <p className="centerContainer">No articles found.</p>;
    }

    return articles.map((article, index) => (
      <Card key={article.url || index} article={article} />
    ));
  };

  return (
    <MainLayout>
      <div className="container">
        <SortBy
          options={sortByOptions}
          value={sortBy}
          onChange={handleSortOnChange}
        />

        {pagination && !loading && !error && (
          <div className="pagination-info">
            Showing {pagination.offset + 1} to{' '}
            {Math.min(pagination.offset + pagination.count, pagination.total)}{' '}
            of {pagination.total} articles
          </div>
        )}

        <div className="grid" data-testid="articles-grid">
          {renderContent()}
        </div>

        {!loading && !error && articles.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            loading={loading}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Landing;
