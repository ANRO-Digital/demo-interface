import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import SetAccountPage from "../pages/SetAccountPage";
export const publicRoutes = [
    {
        path: '/login',
        Component: LoginPage
    }
]

export const authRoutes = [
    {
        path: '/dashboard',
        Component: Dashboard
    },
    {
        path: '/account',
        Component: SetAccountPage
    }
]