import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function AdminContentPage() {
  return (
    <DashboardLayout title="Content Editor">
      <p className="text-gray-600 dark:text-gray-300">
        Update site sections via PUT /api/content/sections/[key].
      </p>
    </DashboardLayout>
  );
}
