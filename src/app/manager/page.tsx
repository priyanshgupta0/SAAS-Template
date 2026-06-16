import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function ManagerPage() {
  return (
    <DashboardLayout title="Manager Dashboard">
      <p className="text-gray-600 dark:text-gray-300">
        Team management and contact review tools.
      </p>
    </DashboardLayout>
  );
}
