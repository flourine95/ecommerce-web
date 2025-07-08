'use client';

import { ModeToggle } from '@/components/auth/mode-toggle';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
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
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
