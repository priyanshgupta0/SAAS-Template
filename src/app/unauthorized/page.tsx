import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-gray-600 dark:text-gray-300">
        You do not have permission to access this page.
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
