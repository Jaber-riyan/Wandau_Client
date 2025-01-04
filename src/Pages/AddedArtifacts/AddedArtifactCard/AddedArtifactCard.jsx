import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/UseAuth/UseAuth";

const AddedArtifactCard = ({ artifact }) => {
    const {
        artifactName,
        artifactImage,
        historicalContext,
        likeCount,
        _id
    } = artifact;
    const param = useLocation();


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
                        <FaHeart className="text-red-500" />
                        <span className="text-gray-700 font-medium">{likeCount}</span>
                    </div>
                    <div className="flex gap-3">
                        <Link to={`/update-artifact/${_id}`} className="bg-blue-400 text-white text-sm px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
                            Update
                        </Link>
                        <Link className="bg-red-400 text-white text-sm px-4 py-2 rounded hover:bg-red-500 transition-colors duration-300">
                            Delete
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddedArtifactCard;
