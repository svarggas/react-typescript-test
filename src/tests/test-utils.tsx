import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { ReactElement } from 'react';

// Make use of react router in tests
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

const renderWithoutRouter = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, options);

export * from '@testing-library/react';
export { customRender as render, renderWithoutRouter };
