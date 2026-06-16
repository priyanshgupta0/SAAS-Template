import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/organisms/Hero';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('Hero', () => {
  it('renders hero content', () => {
    render(
      <Hero
        title="Test Title"
        subtitle="Test subtitle"
        ctaPrimary="Start"
        ctaSecondary="Pricing"
      />,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });
});
