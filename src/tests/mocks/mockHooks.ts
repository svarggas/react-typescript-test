import { mockApiResponse } from './mockData';

// Mock for useFetch hook
export const mockUseFetch = jest.fn(() => {
  return jest.fn().mockResolvedValue(mockApiResponse);
});

// Mock for useGetArticles hook
export const mockUseGetArticles = jest.fn(() => {
  return jest.fn().mockResolvedValue(mockApiResponse);
});

// Mock for failed fetch
export const mockFailedFetch = jest.fn(() => {
  return jest.fn().mockRejectedValue(new Error('Failed to fetch articles'));
});

// Mock for useNavigate
export const mockNavigate = jest.fn();

// Mock for useLocation
export const mockUseLocation = jest.fn(() => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'default',
}));
