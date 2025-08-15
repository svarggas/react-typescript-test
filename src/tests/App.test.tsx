import { screen, waitFor } from '@testing-library/react';
import { renderWithoutRouter as render } from './test-utils';
import App from '../App';
import { mockArticles } from './mocks/mockData';

const mockGetArticles = jest.fn();
jest.mock('../hooks/useGetArticles', () => ({
  useGetArticles: () => mockGetArticles,
}));

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetArticles.mockResolvedValue({ data: mockArticles });
  });

  it('should render the landing page with articles', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('articles-grid')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockArticles[0].title)).toBeInTheDocument();
    });
  });

  it('should handle error state', async () => {
    mockGetArticles.mockRejectedValue(new Error('Failed to fetch articles'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading articles/)).toBeInTheDocument();
    });
  });

  it('should handle empty articles state', async () => {
    mockGetArticles.mockResolvedValue({ data: [] });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('articles-grid')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('No articles found.')).toBeInTheDocument();
    });
  });
});
