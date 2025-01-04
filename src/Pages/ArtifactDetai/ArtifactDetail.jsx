import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaTools, FaPaintBrush } from 'react-icons/fa';
import { RiCompassDiscoverFill } from "react-icons/ri";
import { Link, useLoaderData } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet'

function ArtifactDetail() {
    const loaderData = useLoaderData();
    const [data, setData] = useState(loaderData.data);
    const axiosInstanceSecure = UseAxiosSecure();
    const { user } = useAuth();

    const handleLike = () => {
        console.log(data._id);
        const body = { likeArtifact: data?._id, user: user?.email }
        axiosInstanceSecure.post(`/like/${data._id}?email=${user.email}`, body)
            .then(res => {
                // console.log(res.data.status);
                if (!res.data.status) {
                    toast.info("You Already Liked This Artifact")
                    return
                }
                else {
                    axiosInstanceSecure.patch(`/like/${data._id}`)
                        .then(res => {
                            console.log(res.data);
                        })
                    axiosInstanceSecure.get(`artifact/${data?._id}`)
                        .then(res => {
                            setData(res.data.data);
                        })
                }
            })

    }

    return (
        <div className="max-w-4xl mx-auto p-4 animate__animated animate__fadeIn">
            <Helmet><title>Artifacts Detail | Wandau</title></Helmet>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={data.artifactImage}
                    alt={data.artifactName}
                    className="w-full object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        {data.artifactName}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <FaPaintBrush className="mr-2 text-blue-500" />
                            <span className="font-semibold">Type:</span> {data.artifactType}
                        </div>
                        <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-green-500" />
                            <span className="font-semibold">Created At:</span> {data.createdAt}
                        </div>
                        <div className="flex items-center">
                            <FaTools className="mr-2 text-red-500" />
                            <span className="font-semibold">Discovered At:</span> {data.discoveredAt}
                        </div>
                        <div className="flex items-center">
                            <RiCompassDiscoverFill className="mr-2 text-yellow-500" />
                            <span className="font-semibold">Discovered By:</span> {data.discoveredBy}
                        </div>
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-purple-500" />
                            <span className="font-semibold">Present Location:</span> {data.presentLocation}
                        </div>
                        <div className="flex items-center">
                            <FaUser className="mr-2 text-teal-500" />
                            <span className="font-semibold">Added By:</span> {data.artifactAddedBy}
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="mr-2 text-indigo-500" />
                            <span className="font-semibold">Email:</span> {data.email}
                        </div>
                        <div className="flex items-center">
                            <FaHeart className="mr-2 text-pink-500" />
                            <span className="font-semibold">Likes:</span> <span> {data.likeCount}</span> <span className='ml-5'><button onClick={handleLike} className="bg-blue-700 text-white text-sm px-5 py-2 rounded hover:bg-blue-800 transition-colors duration-300">Like</button></span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Historical Context</h2>
                        <p className="text-gray-700">{data.historicalContext}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtifactDetail;
