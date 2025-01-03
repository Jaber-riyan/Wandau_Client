import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "../AuthComponents/Login";
import HomeLayout from "../Pages/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <h4>Page Not Found</h4>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
]);

export default router;