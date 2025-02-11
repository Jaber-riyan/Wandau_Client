import React, { useEffect, useState } from 'react';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import FeaturedArtifactsCard from '../../Components/FeaturedArtifacts/FeaturedArtifactsCard/FeaturedArtifactsCard';
import ReactLoading from 'react-loading';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';
import { FaSearch } from 'react-icons/fa';

const AllArtifacts = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const [artifacts, setArtifacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        axiosInstanceNormal.get('/artifacts').then(res => {
            setArtifacts(res.data.data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, [axiosInstanceNormal]);

    useEffect(() => {
        if (searchValue.trim() === '') return;
        setIsLoading(true);
        axiosInstanceNormal.get(`/artifacts-search?search=${searchValue}`)
            .then(res => {
                setArtifacts(res.data.data);
                setIsLoading(false);
            }).catch(() => setIsLoading(false));
    }, [searchValue, axiosInstanceNormal]);

    const handleLike = id => {
        const body = { likeArtifact: id, user: user?.email, userName: user?.displayName };
        axiosInstanceSecure.post(`/like/${id}?email=${user.email}`, body).then(res => {
            if (!res.data.status) {
                toast.info('You Already Liked This Artifact');
                return;
            } else {
                axiosInstanceSecure.patch(`/like/${id}`).then(() => {
                    axiosInstanceNormal.get('/artifacts').then(res => {
                        setArtifacts(res.data.data);
                    });
                });
            }
        });
    };

    const handleReset = () => {
        setSearchValue('');
        setIsLoading(true);
        axiosInstanceNormal.get('/artifacts').then(res => {
            setArtifacts(res.data.data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    };

    return (
        <div className="md:w-[90%] mx-auto mb-6 text-gray-900 dark:text-gray-100">
            <Helmet>
                <title>All Artifacts | Wandau</title>
            </Helmet>
            <div className='mb-10 mt-7'>
                <h2 className='md:text-4xl text-2xl text-center font-bold heading border-2 md:w-1/3 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    All Artifacts
                </h2>
            </div>
            <div className="flex items-center mb-5 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Type name artifacts..."
                    className="input input-bordered w-full max-w-xs mr-3 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
                <button onClick={handleReset} className="btn bg-blue-700 text-white hover:bg-blue-800">Reset</button>
            </div>

            {isLoading ? (
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <ReactLoading type="spin" color="red" height={50} width={50} />
                </div>
            ) : (
                artifacts?.length > 0 ? (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {artifacts.map((artifact) => (
                            <FeaturedArtifactsCard key={artifact._id} artifact={artifact} handleLike={handleLike} />
                        ))}
                    </div>
                ) : (
                    <h2 className="text-3xl font-bold mb-5 text-red-500 text-center">
                        No Artifacts Found by this name: "{searchValue}" :(
                    </h2>
                )
            )}
        </div>
    );
};

export default AllArtifacts;
