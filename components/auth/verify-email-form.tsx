'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VerifyEmailFormProps {
  email?: string;
  onVerificationComplete?: () => void;
}

export function VerifyEmailForm({
  email = 'user@example.com',
  onVerificationComplete,
}: VerifyEmailFormProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');
  const [resendCount, setResendCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);

  const handleResendEmail = async () => {
    if (cooldownTime > 0) return;

    setIsResending(true);
    setResendError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle resend verification email logic here
      console.log('Resending verification email to:', email);

      setResendSuccess(true);
      setResendCount((prev) => prev + 1);

      // Set cooldown period (60 seconds)
      setCooldownTime(60);
      const interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Hide success message after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000);
    } catch {
      setResendError('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckEmail = () => {
    // This would typically check if the email has been verified
    // For demo purposes, we'll just show a success state
    onVerificationComplete?.();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-center text-2xl font-bold">
          Verify your email
        </CardTitle>
        <CardDescription className="text-center">
          {"We've sent a verification link to"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-foreground font-medium break-all">{email}</p>
        </div>

        <div className="bg-muted/50 space-y-3 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Clock className="text-muted-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="text-muted-foreground text-sm">
              <p className="mb-1 font-medium">Check your email</p>
              <p>
                Click the verification link in the email we sent you. The link
                will expire in 24 hours.
              </p>
            </div>
          </div>
        </div>

        {resendSuccess && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Verification email sent successfully! Check your inbox.
            </AlertDescription>
          </Alert>
        )}

        {resendError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{resendError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleResendEmail}
            variant="outline"
            className="w-full"
            disabled={isResending || cooldownTime > 0}
          >
            {isResending
              ? 'Sending...'
              : cooldownTime > 0
                ? `Resend in ${cooldownTime}s`
                : resendCount > 0
                  ? 'Resend verification email'
                  : 'Resend verification email'}
          </Button>

          <Button onClick={handleCheckEmail} className="w-full">
            {"I've verified my email"}
          </Button>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-muted-foreground text-sm">
            {"Didn't receive the email? Check your spam folder."}
          </p>
          {resendCount > 0 && (
            <p className="text-muted-foreground text-xs">
              Email sent {resendCount} {resendCount === 1 ? 'time' : 'times'}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          variant="link"
          className="px-0 text-sm font-normal"
          onClick={() => (window.location.href = '/login')}
        >
          Back to Sign In
        </Button>
        <p className="text-muted-foreground text-center text-xs">
          Need help? Contact our support team
        </p>
      </CardFooter>
    </Card>
  );
}
