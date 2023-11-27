import { useSelector } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthOutlet, AuthRoutes } from "../auth/routes";
import { JournalOutlet, JournalRoutes } from "../journal/routes";

import { CheckingAuth } from "../ui/";
import { useCheckAuth } from "../hooks";
import { ErrorPage } from "./ErrorPage";


const PrivateRoute = ({ children }) => {
    const { status } = useSelector(state => state.auth);
    return status === 'authenticated' ? children : <Navigate to="/auth/login" />;
};

const AuthRoute = ({ children }) => {
    const { status } = useSelector(state => state.auth);
    return status !== 'authenticated' ? children : <Navigate to="/" />;
};


const routesConfig = createBrowserRouter([
    {
        path: "/auth/*",
        element: <AuthRoute><AuthOutlet /></AuthRoute>,
        children: AuthRoutes,
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: <PrivateRoute><JournalOutlet /></PrivateRoute>,
        children: JournalRoutes,
        errorElement: <ErrorPage />,
    }
]);

export const AppRouter = () => {


    const status = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return <RouterProvider router={routesConfig} />
};
