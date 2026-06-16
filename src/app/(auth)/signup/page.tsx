import { AuthLayout } from '@/components/templates/AuthLayout';
import { SignupPage } from '@/components/pages/SignupPage';

export default function Page() {
  return (
    <AuthLayout title="Create your account">
      <SignupPage />
    </AuthLayout>
  );
}
