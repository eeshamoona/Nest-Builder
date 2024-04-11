import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const auth = useAuth();

  if (!auth?.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default Protected;
