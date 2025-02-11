import React, { useEffect, useState } from 'react';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import FeaturedArtifactsCard from './FeaturedArtifactsCard/FeaturedArtifactsCard';
import { Link, useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';

const FeaturedArtifacts = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const [isLoading, setIsLoading] = useState(true);
    const [artifacts, setArtifacts] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstanceNormal.get('/featured-artifacts')
            .then(res => {
                setArtifacts(res.data.data);
                setIsLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load artifacts.");
                setIsLoading(false);
            });
    }, [axiosInstanceNormal]);

    const handleLike = (id) => {
        if (!user) {
            toast.info("Please login first!");
            return navigate("/login");
        }

        const body = { likeArtifact: id, user: user?.email, userName: user?.displayName };
        axiosInstanceSecure.post(`/like/${id}?email=${user.email}`, body)
            .then(res => {
                if (!res.data.status) {
                    toast.info("You already liked this artifact.");
                    return;
                }
                axiosInstanceSecure.patch(`/like/${id}`)
                    .then(() => {
                        axiosInstanceNormal.get('/featured-artifacts')
                            .then(res => setArtifacts(res.data.data));
                    });
            });
    };

    if (isLoading) {
        return <>
            <div className='mb-10 mt-10'>
                <h2 className='md:text-4xl text-2xl text-center dark:text-white font-bold heading border-2 md:w-2/4 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    Featured Artifacts
                </h2>
            </div>
            <Loading text="" />;
        </>
    }

    return (
        <div className='w-[90%] mx-auto space-y-6'>
            <div className='mb-10 mt-10'>
                <h2 className='md:text-4xl text-2xl text-center dark:text-white font-bold heading border-2 md:w-2/4 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    Featured Artifacts
                </h2>
            </div>

            {artifacts.length > 0 ? (
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                    {artifacts.map(artifact => (
                        <FeaturedArtifactsCard key={artifact._id} artifact={artifact} handleLike={handleLike} />
                    ))}
                </div>
            ) : (
                <p className='text-center text-2xl font-semibold text-gray-500 dark:text-gray-400'>No artifacts available at the moment.</p>
            )}

            <div className='flex justify-center'>
                <Link to='/all-artifacts' className="px-8 py-3 bg-[#0ef] dark:bg-[#00bcd4] text-black dark:text-white font-bold rounded-xl shadow-lg transition-all hover:bg-[#00ffff] dark:hover:bg-[#00ffff] hover:shadow-2xl">
                    See All
                </Link>
            </div>
        </div>
    );
};

export default FeaturedArtifacts;