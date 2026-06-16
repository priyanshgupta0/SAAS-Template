import { render, screen } from '@testing-library/react';
import { LandingPage } from '@/components/pages/LandingPage';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
    article: ({ children }: React.PropsWithChildren) => <article>{children}</article>,
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe('LandingPage', () => {
  it('renders landing hero from fixture data', () => {
    render(<LandingPage />);
    expect(screen.getByText('Ship your SaaS faster')).toBeInTheDocument();
  });
});
