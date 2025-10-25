import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const rootRoute = createRootRoute({
  component: () => {
    const { role, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate({ to: "/" });
    };
    return (
      <div>
        <div className="flex justify-between m-4">
          <div className="flex gap-4 text-xl">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{" "}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <Link to="/contact" className="[&.active]:font-bold">
              Contact
            </Link>
            <Link to="/services" className="[&.active]:font-bold">
              Services
            </Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="[&.active]:font-bold">
                  Login
                </Link>
                <Link to="/register" className="[&.active]:font-bold">
                  Register
                </Link>
                <Link to="/forgot-password" className="[&.active]:font-bold">
                  Forgot Password
                </Link>
              </>
            )}
            {role === "admin" && (
              <Link to="/admin" className="[&.active]:font-bold">
                Admin
              </Link>
            )}
            {role === "seller" && (
              <Link to="/seller" className="[&.active]:font-bold">
                Seller
              </Link>
            )}
          </div>
          <div>
            {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
          </div>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});
