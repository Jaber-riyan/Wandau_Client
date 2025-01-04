import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import { Helmet } from 'react-helmet';
import ReactLoading from 'react-loading';

const LikedPersons = () => {
    const { id } = useParams();
    const [likedPersons, setLikedPersons] = useState([]);
    const axiosInstanceNormal = UseAxiosNormal();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstanceNormal.get(`/liked-persons/${id}`)
            .then((res) => {
                setLikedPersons(res.data.data);
            }).catch((err) => {
                console.error(err.message);
            });
    }, [axiosInstanceNormal, id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className='md:w-[80%] mx-auto mt-9'>
                <Helmet><title>Liked Person | Wandau</title></Helmet>
                <h2 className='text-3xl font-bold mb-5'>Artifact Liked Persons</h2>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <ReactLoading type="spin" color="red" />
                </div>
            </div>
        );
    }

    return (
        <div className='md:w-[80%] mx-auto mt-9 mb-9 min-h-[60vh]'>
            <Helmet><title>Liked Person | Wandau</title></Helmet>
            <h2 className='text-3xl font-bold mb-5 text-center text-blue-800'>Artifact Liked Persons</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="table-auto w-full bg-white rounded-lg">
                    {/* Table Header */}
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <tr>
                            <th className="p-4 text-left text-lg font-semibold">#</th>
                            <th className="p-4 text-left text-lg font-semibold">Name</th>
                            <th className="p-4 text-left text-lg font-semibold">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {likedPersons.length > 0 ? (
                            likedPersons.map((likedPerson, index) => (
                                <tr key={likedPerson?._id} className="hover:bg-blue-50 transition">
                                    <td className="p-4 border-b font-semibold text-gray-800">{index + 1}</td>
                                    <td className="p-4 border-b font-semibold text-gray-800">{likedPerson?.user || 'N/A'}</td>
                                    <td className="p-4 border-b font-semibold text-gray-800">{likedPerson?.userName || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500">
                                    No liked persons found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LikedPersons;
