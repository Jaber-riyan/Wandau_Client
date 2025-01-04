import React from 'react';
import { FaUser, FaEnvelope, FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaTools, FaPaintBrush } from 'react-icons/fa';
import { RiCompassDiscoverFill } from "react-icons/ri";
import { Link, useLoaderData } from 'react-router-dom';

function ArtifactDetail() {
    const {data} = useLoaderData();
    // Sample artifact data
    // const data = {
    //     artifactName: 'Mask of Tutankhamun',
    //     artifactImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Tutankhamun_mask_golden.jpg/1200px-Tutankhamun_mask_golden.jpg',
    //     artifactType: 'Art/Sculpture',
    //     historicalContext: 'A golden funerary mask of the Egyptian pharaoh Tutankhamun.',
    //     createdAt: '1323 BC',
    //     discoveredAt: '1925',
    //     discoveredBy: 'Howard Carter',
    //     presentLocation: 'Egyptian Museum, Cairo',
    //     artifactAddedBy: 'jaber riyan',
    //     email: 'jaberriyan314@gmail.com',
    //     likeCount: 7
    // };

    return (
        <div className="max-w-4xl mx-auto p-4 animate__animated animate__fadeIn">
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
                            <span className="font-semibold">Likes:</span> <span> {data.likeCount}</span> <span className='ml-8'><Link>Like</Link></span>
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
