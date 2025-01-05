import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/UseAuth/UseAuth";

const FeaturedArtifactsCard = ({ artifact, handleLike }) => {
    const {
        artifactName,
        artifactImage,
        historicalContext,
        likeCount,
        _id
    } = artifact;
    const param = useLocation();
    // console.log(param?.pathname);


    return (
        <div className="cinzel-font bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
            {/* Image */}
            <div>
                <img
                    src={artifactImage}
                    alt={artifactName}
                    className="h-72 w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Name */}
                <h2 className="text-xl font-extrabold text-gray-800">{artifactName}</h2>

                {/* Description */}
                <p className="text-[1rem] font-semibold text-gray-600 mt-2">{historicalContext.slice(0, 25)}....<Link to={`/view-artifact/${_id}`} className="hover:underline dm-sans-font">see more</Link></p>

                {/* Like Count and View Button */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <Link to={`/liked-persons/${_id}`} className="flex gap-2 hover:underline hover:text-blue-400 items-center text-red-600">
                            <FaHeart />
                            <span className="text-gray-700 font-medium">{likeCount}</span>
                        </Link>
                        <span onClick={() => handleLike(_id)} className='ml-8'>
                            <button className="bg-blue-700 text-white text-sm px-5 py-2 rounded hover:bg-blue-800 transition-colors duration-300">
                                Like
                            </button>
                        </span>
                    </div>
                    <Link to={`/view-artifact/${_id}`} className="bg-blue-400 text-white text-sm px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedArtifactsCard;
