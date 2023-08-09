import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthOutlet, AuthRoutes } from "../auth/routes";
import { JournalOutlet, JournalRoutes } from "../journal/routes";

import { ErrorPage } from "./ErrorPage";

// import { Navigate } from "react-router-dom";


const routesConfig = createBrowserRouter([
    {
        path: "/auth/*",
        element: <AuthOutlet />,
        children: AuthRoutes,
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: < JournalOutlet />,
        children: JournalRoutes,
        errorElement: <ErrorPage />,
    }
]);

export const AppRouter = () => {
    return <RouterProvider router={routesConfig} />
};
