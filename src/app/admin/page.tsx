import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function AdminPage() {
  return (
    <DashboardLayout title="Admin Dashboard">
      <p className="text-gray-600 dark:text-gray-300">
        Manage users, content, and contact submissions.
      </p>
    </DashboardLayout>
  );
}
