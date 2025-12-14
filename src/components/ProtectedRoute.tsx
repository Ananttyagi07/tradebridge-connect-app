import { Navigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { address, isConnected } = useWallet();

  if (!isConnected) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
