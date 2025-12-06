import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, token, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token but no user, fetch the user
    if (token && !isAuthenticated && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [token, isAuthenticated, isLoading, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token || !isAuthenticated) {
    // Redirect to auth page, but save the location they were trying to go to
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

