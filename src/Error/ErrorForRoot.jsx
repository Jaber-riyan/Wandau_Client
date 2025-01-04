import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/UseAuth/UseAuth';

const ErrorForRoot = () => {
    const {user} = useAuth();
    return (
        <div>
            <Helmet><title>404 | Wandau</title></Helmet>
            <header className='sticky top-0 z-10 border-2 backdrop-blur-sm bg-transparent'>
                <Navbar></Navbar>
            </header>
            <div className='flex justify-center items-center min-h-[50vh] flex-col gap-y-10'>
                <h3 className='font-bold text-4xl text-red-600 italic text-center animate__animated animate__shakeX'>Page Not found</h3>
                <div>
                    {!user && <Link to={'/login'} className="mr-3 w-full py-2 px-7 mt-4 text-white bg-gray-800 rounded-md hover:bg-gray-900">
                        Login
                    </Link>}
                    <Link to={'/'} className="w-full py-2 px-7 mt-4 text-white bg-gray-800 rounded-md hover:bg-gray-900">
                        Back To Home
                    </Link>
                </div>
            </div>
            <footer className='dm-sans-font'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default ErrorForRoot;