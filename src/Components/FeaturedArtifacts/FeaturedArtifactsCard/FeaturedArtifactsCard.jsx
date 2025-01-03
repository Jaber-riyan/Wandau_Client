import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedArtifactsCard = ({ artifact }) => {
    const {
        artifactName,
        artifactImage,
        historicalContext,
        likeCount,
    } = artifact;

    return (
        <div className=" bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
            {/* Image */}
            <img
                src={artifactImage}
                alt={artifactName}
                className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">
                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800">{artifactName}</h2>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2">{historicalContext}</p>

                {/* Like Count and View Button */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <FaHeart className="text-red-500" />
                        <span className="text-gray-700 font-medium">{likeCount}</span>
                    </div>
                    <Link className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedArtifactsCard;
