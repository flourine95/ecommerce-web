'use client';

import { useAuth } from '@/hooks/use-auth';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  allowedPermissions?: string[];
  fallback?: React.ReactNode;
}

export const RoleGate = ({
  children,
  allowedRoles = [],
  allowedPermissions = [],
  fallback = null,
}: RoleGateProps) => {
  const { hasAnyRole, hasAnyPermission } = useAuth();

  // Check if user has any of the allowed roles
  const hasAllowedRole = allowedRoles.length === 0 || hasAnyRole(allowedRoles);

  // Check if user has any of the allowed permissions
  const hasAllowedPermission =
    allowedPermissions.length === 0 || hasAnyPermission(allowedPermissions);

  // Show content if user has required role OR permission
  if (hasAllowedRole || hasAllowedPermission) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
