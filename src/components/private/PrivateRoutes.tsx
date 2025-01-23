import { Navigate } from "react-router";

type PrivateRoute = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRoute> = ({ children }) => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

  return isAdmin ? children : <Navigate to="/" />;
};
export default PrivateRoute;
