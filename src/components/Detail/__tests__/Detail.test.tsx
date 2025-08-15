import { screen } from '@testing-library/react';
import { render } from '../../../tests/test-utils';
import DetailView from '../index';
import { mockArticle } from '../../../tests/mocks/mockData';

const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocation(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('DetailView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render article details when article is provided', () => {
    mockUseLocation.mockReturnValue({
      state: { article: mockArticle },
    });

    render(<DetailView />);

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.category)).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  it('should show "Article not found" when no article is provided', () => {
    mockUseLocation.mockReturnValue({
      state: null,
    });

    render(<DetailView />);

    expect(screen.getByText('Article not found')).toBeInTheDocument();
  });

  it('should handle article with null image', () => {
    const articleWithoutImage = { ...mockArticle, image: null };

    mockUseLocation.mockReturnValue({
      state: { article: articleWithoutImage },
    });

    render(<DetailView />);

    // When image is null, no image should be rendered
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
  });

  it('should handle article with image', () => {
    mockUseLocation.mockReturnValue({
      state: { article: mockArticle },
    });

    render(<DetailView />);

    if (mockArticle.image) {
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', mockArticle.image);
    }
  });
});
