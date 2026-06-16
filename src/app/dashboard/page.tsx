import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function UserDashboardPage() {
  return (
    <DashboardLayout title="Your Dashboard">
      <p className="text-gray-600 dark:text-gray-300">
        Welcome to your SaaS workspace.
      </p>
    </DashboardLayout>
  );
}
