import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-lavender-600 text-white hover:bg-lavender-700 dark:bg-lavender-500 dark:hover:bg-lavender-600',
  secondary:
    'border border-lavender-300 text-lavender-700 hover:bg-lavender-50 dark:border-lavender-600 dark:text-lavender-200 dark:hover:bg-lavender-900',
  ghost: 'text-lavender-700 hover:bg-lavender-100 dark:text-lavender-200 dark:hover:bg-lavender-900',
};

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
