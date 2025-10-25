import { ProtectedRoute } from "@/components/ProtectedRoute";
import Admin from "@/pages/Admin";
import Home from "@/pages/Home";
import { Login } from "@/pages/Login";
import NotFound from "@/pages/Not-Found";
import Seller from "@/pages/Seller";
import {
  Outlet,
  RouterProvider,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import About from "../pages/About";
import { rootRoute } from "./__root";

//index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

//public routes
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "about",
  component: Outlet,
});

const nestedAbout = createRoute({
  getParentRoute: () => aboutRoute,
  path: "/",
  component: About,
});

const nestedAbout1 = createRoute({
  getParentRoute: () => aboutRoute,
  path: "test",
  component: () => <div>Hello from main test</div>,
});

//login
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: Login,
});

//admin routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "admin",
  component: () => (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Admin />
    </ProtectedRoute>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "admin/users",
  component: () => (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div>Admin - Manage Users</div>
    </ProtectedRoute>
  ),
});

//seller routes
const sellerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "seller",
  component: () => (
    <ProtectedRoute allowedRoles={["seller"]}>
      <Seller />
    </ProtectedRoute>
  ),
});

const sellerOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "seller/orders",
  component: () => (
    <ProtectedRoute allowedRoles={["seller"]}>
      <div>Seller - Manage Orders</div>
    </ProtectedRoute>
  ),
});

//not found
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute.addChildren([nestedAbout, nestedAbout1]),
  loginRoute,
  adminRoute,
  adminUsersRoute,
  sellerRoute,
  sellerOrdersRoute,
  notFoundRoute,
]);

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
