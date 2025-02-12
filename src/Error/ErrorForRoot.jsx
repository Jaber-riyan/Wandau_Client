import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import useAuth from '../Hooks/UseAuth/UseAuth';

const ErrorForRoot = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gray-100 dark:bg-gray-800 flex flex-col justify-between">
            <Helmet>
                <title>404 | Wandau</title>
            </Helmet>

            <header className="sticky top-0 z-10 border-b dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <Navbar />
            </header>

            <main className="flex flex-col items-center justify-center flex-grow text-center p-6 min-h-screen">
                <h3 className="font-bold text-5xl text-red-600 italic animate-bounce dark:text-red-400">
                    404 - Page Not Found
                </h3>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md">
                    Oops! The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <div className="mt-6 flex space-x-4">
                    {!user && (
                        <Link
                            to="/login"
                            className="py-2 px-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                        >
                            Login
                        </Link>
                    )}
                    <Link
                        to="/"
                        className="py-2 px-6 text-white bg-gray-800 rounded-md hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                    >
                        Back To Home
                    </Link>
                </div>
            </main>

            <footer className="bg-gray-200 dark:bg-gray-800 text-center border-t-2 dark:border-gray-600">
                <Footer />
            </footer>
        </div>
    );
};

export default ErrorForRoot;
