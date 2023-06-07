import { auth } from '@config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  redirectUrl?: string;
}

function PrivateRoutes({ redirectUrl = '/login' }: PrivateRouteProps) {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to={redirectUrl} replace />;
  }

  return <Outlet />;
}

export default PrivateRoutes;

PrivateRoutes.defaultProps = {
  redirectUrl: '/login',
};
