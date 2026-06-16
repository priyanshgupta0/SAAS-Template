import { LiveStatsSection } from '@/components/organisms/LiveStatsSection';
import { loadSiteJson } from '@/lib/contentLoader';

interface LiveData {
  title: string;
  subtitle: string;
  stats: Array<{ label: string; value: string; trend: string }>;
}

export function LivePage() {
  const data = loadSiteJson<LiveData>('live.json');
  return <LiveStatsSection {...data} />;
}
