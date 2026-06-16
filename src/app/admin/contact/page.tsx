import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function AdminContactPage() {
  return (
    <DashboardLayout title="Contact Inbox">
      <p className="text-gray-600 dark:text-gray-300">
        View contact submissions via the API or Swagger docs.
      </p>
    </DashboardLayout>
  );
}
