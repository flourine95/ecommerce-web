'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface WithAuthProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  redirectTo?: string;
}

export const WithAuth = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  redirectTo = '/login',
}: WithAuthProps) => {
  const { isAuthenticated, isLoading, hasAnyRole, hasAnyPermission } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      // Check roles if required
      if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
        router.push('/unauthorized');
        return;
      }

      // Check permissions if required
      if (
        requiredPermissions.length > 0 &&
        !hasAnyPermission(requiredPermissions)
      ) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    requiredRoles,
    requiredPermissions,
    hasAnyRole,
    hasAnyPermission,
    router,
    redirectTo,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-32 w-32 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Check roles and permissions
  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return null;
  }

  if (
    requiredPermissions.length > 0 &&
    !hasAnyPermission(requiredPermissions)
  ) {
    return null;
  }

  return <>{children}</>;
};
