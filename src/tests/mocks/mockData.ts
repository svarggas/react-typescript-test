import type { Article } from '../../models/article';

export const mockArticle: Article = {
  author: 'Test Author',
  title: 'Test Article Title',
  description: 'This is a test article description for testing purposes.',
  url: 'https://example.com/test-article',
  source: 'Test Source',
  image: 'https://example.com/test-image.jpg',
  category: 'technology',
  language: 'en',
  country: 'us',
  published_at: '2025-01-15T10:30:00Z',
};

export const mockArticles: Article[] = [
  mockArticle,
  {
    author: 'John Doe',
    title: 'Business News Article',
    description: 'This is a business news article.',
    url: 'https://example.com/business-article',
    source: 'Business Source',
    image: null,
    category: 'business',
    language: 'en',
    country: 'us',
    published_at: '2025-01-14T09:15:00Z',
  },
  {
    author: 'Jane Smith',
    title: 'Sports Update',
    description: 'Latest sports news and updates.',
    url: 'https://example.com/sports-article',
    source: 'Sports Network',
    image: 'https://example.com/sports-image.jpg',
    category: 'sports',
    language: 'en',
    country: 'us',
    published_at: '2025-01-13T14:45:00Z',
  },
];

export const mockApiResponse = {
  data: mockArticles,
};
