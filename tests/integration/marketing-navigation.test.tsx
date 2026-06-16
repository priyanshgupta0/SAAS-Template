import { render, screen } from '@testing-library/react';
import { Header } from '@/components/organisms/Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Marketing navigation', () => {
  it('exposes all marketing routes in header', () => {
    render(<Header />);
    ['About', 'Pricing', 'Team', 'Careers', 'Contact', 'Live'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
