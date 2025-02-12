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
import LikedArtifacts from "../Pages/LikedArtifacts/LikedArtifacts";
import UpdateArtifact from "../Pages/UpdateArtifact/UpdateArtifact";
import ErrorForRoot from "../Error/ErrorForRoot";
import LikedPersons from "../Pages/LikedPersons/LikedPersons";
import NoInternet from "../Error/NoInternet";



const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <ErrorForRoot></ErrorForRoot>,
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
                loader: ({ params }) => fetch(`https://wandau-server.vercel.app/artifact/${params.id}`)
            },
            {
                path: '/my-artifacts',
                element: <PrivateRoutes><AddedArtifacts></AddedArtifacts></PrivateRoutes>
            },
            {
                path: '/liked-artifacts',
                element: <PrivateRoutes><LikedArtifacts></LikedArtifacts></PrivateRoutes>
            },
            {
                path: '/update-artifact/:id',
                element: <PrivateRoutes><UpdateArtifact></UpdateArtifact></PrivateRoutes>
            },
            {
                path: '/liked-persons/:id',
                element: <PrivateRoutes><LikedPersons></LikedPersons></PrivateRoutes>
            },
            {
                path: '/no-internet',
                element: <NoInternet></NoInternet>
            }
        ]
    },
]);

export default router;