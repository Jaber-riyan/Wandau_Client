import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const RecentNews = () => {
    return (
        <section className="dark:bg-gray-900 text-black dark:text-white py-16 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold cinzel-font animate__animated animate__fadeInDown">
                    Recent News
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Get Latest Updates and News
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* News Card */}
                <div className="flex flex-col bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                        <FaRegCalendarAlt />
                        <span>Dec 26, 2020</span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold cinzel-font mt-4">
                        The Ultimate Guide To Knots Practice Kit
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Learn to tie over 250 knots with step-by-step instructions.
                        Supplied with 4...
                    </p>

                    <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                        Continue reading →
                    </a>
                </div>

                {/* Image */}
                <div className="w-full flex justify-center">
                    <img
                        src="https://i.ibb.co.com/JRyrCmHm/recent-news01.jpg"
                        alt="Recent News"
                        className="rounded-lg shadow-lg w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default RecentNews;
