import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (Object.keys(user).length === 0) {
    return <Navigate to={"/"} replace />;
  }
  return children;
}
