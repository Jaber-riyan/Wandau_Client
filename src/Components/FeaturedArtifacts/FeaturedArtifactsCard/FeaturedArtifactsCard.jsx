import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedArtifactsCard = ({ artifact, handleLike }) => {
    const { artifactName, artifactImage, historicalContext, likeCount, _id, artifactType } = artifact;

    return (
        <div className="cinzel-font bg-gray-100 dark:bg-[#2a2d3f] rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-500 animate__animated animate__fadeIn shadow-[0_0_13px_#000] dark:hover:shadow-[0_0_20px_#fff] dark:shadow-[0_0_10px_#fff]">
            {/* Image */}
            <div>
                <img
                    src={artifactImage}
                    alt={artifactName}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className="h-72 w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Name */}
                <h2 className="text-xl font-extrabold text-gray-800 dark:text-white heading">{artifactName}</h2>

                {/* Description */}
                <p className="text-[1rem] font-semibold text-gray-600 dark:text-white/60 mt-2">
                    {historicalContext.slice(0, 25)}....
                    <Link to={`/view-artifact/${_id}`} className="hover:underline dm-sans-font text-blue-500 dark:text-cyan-300">see more</Link>
                </p>

                {/* Like Count and View Button */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <Link to={`/liked-persons/${_id}`} className="flex gap-2 hover:underline hover:text-blue-400 items-center text-red-600">
                            <FaHeart className="animate__animated animate__heartBeat animate__infinite" />
                            <span className="text-gray-700 dark:text-white/80 font-medium">{likeCount}</span>
                        </Link>
                        <span onClick={() => handleLike(_id)} className="ml-8">
                            <button className="px-9 py-2 ml-2 bg-[#0ef] dark:bg-[#00bcd4] rounded-3xl text-black dark:text-white font-bold
                                shadow-[0_0_5px_#0ef,0_0_25px_#0ef] dark:shadow-[0_0_5px_#00bcd4,0_0_25px_#00bcd4]
                                hover:bg-[#00ffff] dark:hover:bg-[#00ffff] hover:shadow-[0_0_5px_#00ffff,0_0_25px_#00ffff] 
                                dark:hover:shadow-[0_0_5px_#00ffff,0_0_25px_#00ffff] 
                                transition-all duration-300">
                                Like
                            </button>
                        </span>
                    </div>
                    <Link to={`/view-artifact/${_id}`} className="px-3 py-2 bg-[#ff6347] dark:bg-[#ff4500] rounded-3xl text-black dark:text-white font-bold
                                shadow-[0_0_5px_#ff6347,0_0_25px_#ff6347] dark:shadow-[0_0_5px_#ff4500,0_0_25px_#ff4500] 
                                hover:bg-[#ff7f50] dark:hover:bg-[#ff6347] hover:shadow-[0_0_5px_#ff7f50,0_0_25px_#ff7f50] 
                                dark:hover:shadow-[0_0_5px_#ff6347,0_0_25px_#ff6347] 
                                transition-all duration-300">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedArtifactsCard;
