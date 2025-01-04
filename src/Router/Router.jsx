import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "../AuthComponents/Login";
import HomeLayout from "../Pages/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Register from "../AuthComponents/Register";
import AddArtifact from "../Pages/AddArtifacts/AddArtifacts";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import AllArtifacts from "../Pages/AllArtifacts/AllArtifacts";
import ArtifactDetail from "../Pages/ArtifactDetai/ArtifactDetail";
import AddedArtifacts from "../Pages/AddedArtifacts/AddedArtifacts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <h4>Page Not Found</h4>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/add-artifacts',
                element: <PrivateRoutes><AddArtifact></AddArtifact></PrivateRoutes>
            },
            {
                path: '/all-artifacts',
                element: <AllArtifacts></AllArtifacts>
            },
            {
                path: '/view-artifact/:id',
                element: <PrivateRoutes><ArtifactDetail></ArtifactDetail></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/artifact/${params.id}`)
            },
            {
                path: '/my-artifacts',
                element: <PrivateRoutes><AddedArtifacts></AddedArtifacts></PrivateRoutes>
            }
        ]
    },
]);

export default router;