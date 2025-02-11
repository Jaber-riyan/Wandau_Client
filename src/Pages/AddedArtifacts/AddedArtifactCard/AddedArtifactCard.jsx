import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddedArtifactCard = ({ artifact, handleDelete }) => {
    const {
        artifactName,
        artifactImage,
        historicalContext,
        likeCount,
        _id
    } = artifact;

    return (
        <div className="cinzel-font bg-gray-100 dark:bg-[#2a2d3f] rounded-lg overflow-hidden shadow-lg dark:shadow-[0_0_10px_#fff] transform hover:scale-105 transition-all duration-500 animate__animated animate__fadeInUp">
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
                    <Link to={`/view-artifact/${_id}`} className="hover:underline text-blue-500 dark:text-cyan-300">see more</Link>
                </p>

                {/* Like Count and Action Buttons */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <Link to={`/liked-persons/${_id}`} className="flex gap-2 hover:underline hover:text-blue-400 items-center text-red-600">
                            <FaHeart className="animate__animated animate__heartBeat animate__infinite" />
                            <span className="text-gray-700 dark:text-white/80 font-medium">{likeCount}</span>
                        </Link>
                    </div>
                    <div className="flex gap-3">
                        <Link to={`/update-artifact/${_id}`} className="px-4 py-2 bg-blue-400 dark:bg-blue-500 text-white text-sm rounded hover:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300">
                            Update
                        </Link>
                        <button onClick={() => handleDelete(_id)} className="px-4 py-2 bg-red-400 dark:bg-red-500 text-white text-sm rounded hover:bg-red-500 dark:hover:bg-red-600 transition-all duration-300">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddedArtifactCard;
