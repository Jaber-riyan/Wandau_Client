import React from "react";
import { useNavigate } from "react-router-dom";

const MembershipSection = () => {
    const navigate = useNavigate()
    return (
        <section className="w-full h-screen flex items-center justify-center bg-black/90 text-white dark:bg-gray-900">
            {/* Background Image */}

            {/* Content */}
            <div className="text-center px-6">
                <p className="text-sm uppercase tracking-widest text-gray-200 dark:text-gray-400 mb-6">
                    Join today and enjoy unlimited
                </p>
                <h1 className="text-3xl md:text-6xl mt-2 text-white dark:text-gray-100 cinzel-font w-[70%] mx-auto">
                    Exhibitions, Members Only and More
                </h1>
                <button onClick={() => navigate('/login')} className="mt-6 px-6 py-3 bg-green-400 text-black font-semibold rounded-md hover:bg-green-500 transition dark:bg-green-500 dark:hover:bg-green-600 dark:text-white">
                    Become a Member
                </button>
            </div>
        </section>
    );
};

export default MembershipSection;
