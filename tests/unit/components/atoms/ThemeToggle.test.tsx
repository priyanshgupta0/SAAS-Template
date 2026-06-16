import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/templates/ThemeProvider';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

describe('ThemeToggle', () => {
  it('renders toggle button after mount', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(await screen.findByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
  });
});
