import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
// import NotFound from "@/pages/not-found";

const LoginPage = () =>
    import("@/pages/auth/login").then((module) => ({
        Component: module.default,
    }));

const AddUserPage = () =>
    import("@/pages/users/add").then((module) => ({
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
            { path: "add", lazy: AddUserPage },
        ],
    },
    { path: "*", element: <Navigate to="/auth/login" replace /> },
]);