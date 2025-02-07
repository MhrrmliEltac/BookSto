import { useLocation } from "react-router";
import Navbar from "../header/Navbar";
import { useAppSelector } from "../../hook/hooks";
import Footer from "../footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const user = useAppSelector((state: any) => state.auth.user);

  const hideNavbarFooterRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/recover-password",
  ];

  const isAdminRoute = location.pathname.startsWith("/admin/control");

  const isNavbarVisible =
    !hideNavbarFooterRoutes.includes(location.pathname) && !isAdminRoute;

  return (
    <div>
      {isNavbarVisible && user && <Navbar />}
      {children}
      {isNavbarVisible && user && <Footer />}
    </div>
  );
};
