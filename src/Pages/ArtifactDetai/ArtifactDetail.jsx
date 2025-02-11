import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaTools, FaPaintBrush } from 'react-icons/fa';
import { RiCompassDiscoverFill } from "react-icons/ri";
import { Link, useLoaderData } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';

function ArtifactDetail() {
    const loaderData = useLoaderData();
    const [data, setData] = useState(loaderData.data);
    const axiosInstanceSecure = UseAxiosSecure();
    const { user } = useAuth();

    const handleLike = () => {
        if (!user) {
            toast.info("You need to be logged in to like an artifact.");
            return;
        }
        const body = { likeArtifact: data?._id, user: user?.email, userName: user?.displayName };
        axiosInstanceSecure.post(`/like/${data._id}?email=${user.email}`, body)
            .then(res => {
                if (!res.data.status) {
                    toast.info("You Already Liked This Artifact");
                    return;
                }
                axiosInstanceSecure.patch(`/like/${data._id}`).then(() => {
                    axiosInstanceSecure.get(`artifact/${data?._id}`).then(res => {
                        setData(res.data.data);
                    });
                });
            });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 animate__animated animate__fadeIn">
            <Helmet>
                <title>Artifacts Detail | Wandau</title>
            </Helmet>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <img
                    src={data?.artifactImage}
                    alt={data.artifactName}
                    draggable="false"
                    onContextMenu={(e)=> e.preventDefault()}
                    className="h-96 w-full object-cover"
                />
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                        {data.artifactName}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[{
                            icon: <FaPaintBrush className="text-blue-500" />, label: "Type", value: data.artifactType
                        }, {
                            icon: <FaCalendarAlt className="text-green-500" />, label: "Created At", value: data.createdAt
                        }, {
                            icon: <FaTools className="text-red-500" />, label: "Discovered At", value: data.discoveredAt
                        }, {
                            icon: <RiCompassDiscoverFill className="text-yellow-500" />, label: "Discovered By", value: data.discoveredBy
                        }, {
                            icon: <FaMapMarkerAlt className="text-purple-500" />, label: "Present Location", value: data.presentLocation
                        }, {
                            icon: <FaUser className="text-teal-500" />, label: "Added By", value: data.artifactAddedBy
                        }, {
                            icon: <FaEnvelope className="text-indigo-500" />, label: "Email", value: data.email
                        }].map(({ icon, label, value }, index) => (
                            <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                {icon}
                                <span className="ml-3 text-gray-900 dark:text-gray-200 font-semibold">{label}: </span>
                                <span className="ml-2 text-gray-700 dark:text-gray-300">{value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-8">
                        <Link to={`/liked-persons/${data?._id}`} className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                            <FaHeart className='animate__animated animate__heartBeat animate__infinite' size={20} /> <span>{data.likeCount}</span>
                        </Link>
                        <button onClick={handleLike} className="px-9 py-2 ml-2 bg-[#0ef] dark:bg-[#00bcd4] rounded-3xl text-black dark:text-white font-bold
                                shadow-[0_0_5px_#0ef,0_0_25px_#0ef] dark:shadow-[0_0_5px_#00bcd4,0_0_25px_#00bcd4]
                                hover:bg-[#00ffff] dark:hover:bg-[#00ffff] hover:shadow-[0_0_5px_#00ffff,0_0_25px_#00ffff] 
                                dark:hover:shadow-[0_0_5px_#00ffff,0_0_25px_#00ffff] 
                                transition-all duration-300">
                            Like
                        </button>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Historical Context</h2>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{data.historicalContext}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtifactDetail;
