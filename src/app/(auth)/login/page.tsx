import { AuthLayout } from '@/components/templates/AuthLayout';
import { LoginPage } from '@/components/pages/LoginPage';

export default function Page() {
  return (
    <AuthLayout title="Welcome back">
      <LoginPage />
    </AuthLayout>
  );
}
