import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const auth = UserAuth();

  if (!auth?.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default Protected;
