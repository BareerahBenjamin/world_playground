import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "@/lib/auth";

/**
 * 受保护路由：未登录时跳转到 /login，并记录来源路径以便登录后跳回
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
