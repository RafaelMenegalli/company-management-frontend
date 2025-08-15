import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
// import NotFound from "@/pages/not-found";

const LoginPage = () =>
    import("@/pages/auth/login").then((module) => ({
        Component: module.default,
    }));

const UsersPage = () =>
    import("@/pages/users").then((module) => ({
        Component: module.default,
    }));

export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <RootLayout />,
        children: [],
    },
    {
        path: "/",
        element: <RootLayout hideChrome />,
        children: [
            { path: "/", lazy: LoginPage },
        ],
    },
    {
        path: "/users",
        element: <RootLayout />,
        children: [
            { path: "", lazy: UsersPage },
        ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
]);