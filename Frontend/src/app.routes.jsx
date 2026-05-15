import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import Protected from "./features/auth/components/Protected";
import Interview from "./features/interview/pages/Interview";
import AuthRoute from "./features/auth/components/AuthRoute";

const router = createBrowserRouter([
    {
        path:'/login',
        element:<AuthRoute><Login/></AuthRoute>
    },
    {
        path:'/register',
        element:<AuthRoute><Register/></AuthRoute>
    },
    {
        path:'/',
        element:<Protected><Home/></Protected>
    },
    {
        path:'/interview/:interviewId',
        element:<Protected><Interview/></Protected>
    },
])

export default router;