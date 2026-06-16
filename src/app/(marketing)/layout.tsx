import { MarketingLayout } from '@/components/templates/MarketingLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
