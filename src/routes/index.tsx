import Admin from "@/pages/Admin";
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
import Home from "../pages/Home";
import { rootRoute } from "./__root";

export const userRole = localStorage.getItem("role") || "user";

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
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "admin",
  component: Outlet,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/", // index
  component: Admin,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "users",
  component: () => <div>Admin - Manage Users</div>,
});

//seller routes

const sellerLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "seller",
  component: Outlet,
});

const sellerDashboardRoute = createRoute({
  getParentRoute: () => sellerLayoutRoute,
  path: "/",
  component: Seller,
});

const sellerOrdersRoute = createRoute({
  getParentRoute: () => sellerLayoutRoute,
  path: "orders",
  component: () => <div>Seller - Manage Orders</div>,
});

//not found
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const userRoles = [];

if (userRole === "admin") {
  userRoles.push(
    adminLayoutRoute.addChildren([adminDashboardRoute, adminUsersRoute])
  );
} else if (userRole === "seller") {
  userRoles.push(
    sellerLayoutRoute.addChildren([sellerDashboardRoute, sellerOrdersRoute])
  );
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute.addChildren([nestedAbout, nestedAbout1]),
  loginRoute,
  notFoundRoute,
  ...userRoles,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
