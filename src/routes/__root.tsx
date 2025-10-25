import { Button } from "@/components/ui/button";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const rootRoute = createRootRoute({
  component: () => {
    const isAdmin = localStorage.getItem("role") === "admin";
    const isSeller = localStorage.getItem("role") === "seller";

    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("role");
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
            <Link to="/login" className="[&.active]:font-bold">
              Login
            </Link>
            {isAdmin && (
              <Link to="/admin" className="[&.active]:font-bold">
                Admin
              </Link>
            )}
            {isSeller && (
              <Link to="/seller" className="[&.active]:font-bold">
                Seller
              </Link>
            )}
          </div>
          <div>
            {(isAdmin || isSeller) && (
              <Button onClick={handleLogout}>Logout</Button>
            )}
          </div>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});
