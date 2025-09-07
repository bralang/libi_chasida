import { ReactNode } from 'react';
import { useAuth, UserRole } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && user && !roles.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">אין הרשאה</h1>
          <p className="text-muted-foreground">אין לך הרשאה לצפות בעמוד זה</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}