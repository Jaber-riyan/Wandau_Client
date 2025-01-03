import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from '../UseAuth/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const axiosInstanceSecure = axios.create({
    baseURL: 'https://hire-sphere-server.vercel.app',
    withCredentials: true
})
const UseAxiosSecure = () => {

    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     axiosInstanceSecure.interceptors.response.use(response => {
    //         return response;
    //     }, error => {
    //         console.log("error caught in the interceptor : ", error);

    //         if (error.status === 401 || error.status === 403) {
    //             console.log("Need to logout the user");

    //             // logout functionality 
    //             handleLogout()
    //                 .then(res => {
    //                     Swal.fire({
    //                         title: "Logout Successfully",
    //                         icon: 'success'
    //                     })
    //                     navigate('/login');
    //                 })
    //                 .catch(error => {
    //                     const errorCode = error.code.split("auth/")[1];
    //                     const formattedError = errorCode
    //                         .split("-")
    //                         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    //                         .join(" ");
    //                     toast.error(formattedError);
    //                 })
    //         }

    //         return Promise.reject(error);
    //     })
    // }, [])

    useEffect(() => {
        axiosInstanceSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log("error from interceptor : ", error);
            if (error.status === 401 || error.status === 403) {

                // logout functionality 
                handleLogout()
                    .then(res => {
                        Swal.fire({
                            title: "Logout Successfully",
                            icon: 'success'
                        })
                        navigate('/login');
                    })
                    .catch(error => {
                        const errorCode = error.code.split("auth/")[1];
                        const formattedError = errorCode
                            .split("-")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");
                        toast.error(formattedError);
                    })
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosInstanceSecure;
};

export default UseAxiosSecure;