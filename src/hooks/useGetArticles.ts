import type { Article } from '../models/article';
import type { SortOptions } from '../models/sortOptions';
import { useFetch } from './useFetch';
import { useCallback } from 'react';

interface GetArticlesResponse {
  data: Article[];
  pagination: {
    total: number;
    count: number;
    limit: number;
    offset: number;
  };
}

const getUrl = (sort: SortOptions, limit: number = 100, offset: number = 0) => {
  const apiUrl = new URL('http://api.mediastack.com/v1/news');
  const searchParams = new URLSearchParams({
    languages: 'en',
    limit: limit.toString(),
    offset: offset.toString(),
    sort: sort,
  });
  apiUrl.search = searchParams.toString();
  return apiUrl.toString();
};

export const useGetArticles = () => {
  const fetch = useFetch();

  return useCallback(
    async (sort: SortOptions, limit: number = 100, offset: number = 0) => {
      try {
        return await fetch<GetArticlesResponse>({
          url: getUrl(sort, limit, offset),
          method: 'GET',
        });
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        throw new Error('Failed to fetch articles');
      }
    },
    [fetch],
  );
};
