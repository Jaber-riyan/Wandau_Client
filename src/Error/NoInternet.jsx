import React from "react";
import { Helmet } from "react-helmet";

const NoInternet = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center border-b-2 dark:border-gray-600 border-gray-400">
            <Helmet><title>No Internet | Wandau</title></Helmet>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                    No Internet Connection
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Please check your internet connection and try again.
                </p>
            </div>
        </div>
    );
};

export default NoInternet;
