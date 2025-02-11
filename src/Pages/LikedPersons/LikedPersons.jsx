import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import { Helmet } from 'react-helmet';
import ReactLoading from 'react-loading';
import Loading from '../../Loading/Loading';

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
                <Loading text=""></Loading>
            </div>
        );
    }

    return (
        <div className='md:w-[80%] mx-auto mt-9 mb-9 min-h-[60vh] text-gray-800 dark:text-gray-200'>
            <Helmet><title>Liked Person | Wandau</title></Helmet>
            <div className='mb-10'>
                <h2 className='md:text-4xl text-2xl text-center font-bold heading border-2 md:w-2/3 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    Artifact Liked Persons
                </h2>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="table-auto w-full rounded-lg">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white dark:from-blue-600 dark:to-purple-700">
                        <tr>
                            <th className="p-4 text-left text-lg font-semibold">#</th>
                            <th className="p-4 text-left text-lg font-semibold">Name</th>
                            <th className="p-4 text-left text-lg font-semibold">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {likedPersons.length > 0 ? (
                            likedPersons.map((likedPerson, index) => (
                                <tr key={likedPerson?._id} className="hover:bg-blue-50 dark:hover:bg-gray-800 transition">
                                    <td className="p-4 border-b font-semibold text-gray-800 dark:text-gray-300 dark:border-gray-700">{index + 1}</td>
                                    <td className="p-4 border-b font-semibold text-gray-800 dark:text-gray-300 dark:border-gray-700">{likedPerson?.user || 'N/A'}</td>
                                    <td className="p-4 border-b font-semibold text-gray-800 dark:text-gray-300 dark:border-gray-700">{likedPerson?.userName || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500 dark:text-gray-400">
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
