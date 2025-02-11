import React from "react";
import { FaPlay } from "react-icons/fa";

const Banner = () => {
    return (
        <div className="relative md:w-[90%] mx-auto z-20">
            <div className="md:grid grid-cols-2">
                <div className="relative px-5">
                    {/* Title */}
                    <h1 className="text-[36px] md:text-7xl md:font-medium font-bold animate__animated animate__fadeInDown cinzel-font md:text-white/90 text-white">
                        Discover <span className="text-blue-400">Our </span>History
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-5 ml-3 mx-auto animate__animated animate__fadeInUp dm-sans-font text-white/70 text-[1.1rem]">
                        Curator Peter Loovers explores the special relationship between Arctic Peoples and 'man's best friend.'
                    </p>
                </div>
                <div>
                    {/* Optional additional content */}
                </div>
            </div>
        </div>
    );
};

export default Banner;
