import React, { useContext } from 'react';
import { AuthContext } from '../../Authentication/Authentication';
import { Navigate, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                <ReactLoading type="spin" color="red"></ReactLoading>
            </div>
        </div>
    }
    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoutes;