'use client';

import { useSearchParams } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { ModeToggle } from '@/components/auth/mode-toggle';
import { VerifyEmailForm } from '@/components/auth/verify-email-form';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleVerificationComplete = () => {
    // Redirect to dashboard or show success message
    console.log('Email verification completed');
    window.location.href = '/dashboard';
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="from-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="w-full max-w-md space-y-8">
          <VerifyEmailForm
            email={email || undefined}
            onVerificationComplete={handleVerificationComplete}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
