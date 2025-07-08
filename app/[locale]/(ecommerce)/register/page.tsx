'use client';

import { ModeToggle } from '@/components/auth/mode-toggle';
import { RegisterForm } from '@/components/auth/register-form';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const toggleToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="from-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="bg-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
            <svg
              className="text-primary-foreground h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Get started</h1>
          <p className="text-muted-foreground mt-2">
            Create your account to get started
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
