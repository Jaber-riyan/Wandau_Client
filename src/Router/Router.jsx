import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "../AuthComponents/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="">Hello world!</div>,
    },
    {
        path: '/login',
        element: <Login></Login>
    }
]);

export default router;