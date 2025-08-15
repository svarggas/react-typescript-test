import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import type { ReactNode } from 'react';
import type { Article } from '../models/article';
import type { SortOptions } from '../models/sortOptions';
import type { PaginationInfo } from '../models/pagination';
import { useGetArticles } from '../hooks/useGetArticles';

interface ArticlesContextType {
  articles: Article[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  refetch: (sortBy?: SortOptions, page?: number) => Promise<void>;
  goToPage: (page: number) => void;
  totalPages: number;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined,
);

interface ArticlesProviderProps {
  children: ReactNode;
}

const itemsPerPage = 10;

export const ArticlesProvider = ({ children }: ArticlesProviderProps) => {
  const getArticles = useGetArticles();

  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOptions>('popularity');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = pagination
    ? Math.ceil(pagination.total / itemsPerPage)
    : 0;

  const fetchArticles = useCallback(
    async (sortBy: SortOptions = 'popularity', page: number = 1) => {
      try {
        setLoading(true);
        setError(null);
        const offset = (page - 1) * itemsPerPage;
        const response = await getArticles(sortBy, itemsPerPage, offset);

        setArticles(response.data);
        setPagination(response.pagination);
        setCurrentSort(sortBy);
        setCurrentPage(page);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch articles',
        );
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    },
    [getArticles],
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        fetchArticles(currentSort, page);
      }
    },
    [fetchArticles, currentSort, totalPages],
  );

  useEffect(() => {
    fetchArticles();
    // We just want to call this 1 time at the start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: ArticlesContextType = useMemo(
    () => ({
      articles,
      pagination,
      loading,
      error,
      currentPage,
      itemsPerPage,
      totalPages,
      refetch: fetchArticles,
      goToPage,
    }),
    [
      articles,
      pagination,
      loading,
      error,
      currentPage,
      totalPages,
      fetchArticles,
      goToPage,
    ],
  );

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};

export default ArticlesContext;
