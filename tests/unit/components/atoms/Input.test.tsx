import { render, screen } from '@testing-library/react';
import { Input } from '@/components/atoms/Input';

describe('Input', () => {
  it('renders label and input', () => {
    render(<Input label="Email" name="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
