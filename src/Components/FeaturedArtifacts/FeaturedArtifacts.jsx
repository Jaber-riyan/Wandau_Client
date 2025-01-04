import React, { useEffect, useState } from 'react';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import ReactLoading from 'react-loading';
import FeaturedArtifactsCard from './FeaturedArtifactsCard/FeaturedArtifactsCard';
import { Link } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';

const FeaturedArtifacts = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const [isLoading, setIsLoading] = useState(true);
    const [artifacts, setArtifacts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        axiosInstanceNormal.get('/featured-artifacts')
            .then(res => {
                setArtifacts(res.data.data);
                // console.log(res.data.data);
            })
    }, [axiosInstanceNormal])


    const handleLike = (id) => {
        // console.log(id);
        const body = { likeArtifact: id, user: user?.email, userName : user?.displayName }
        axiosInstanceSecure.post(`/like/${id}?email=${user.email}`, body)
            .then(res => {
                // console.log(res.data.status);
                if (!res.data.status) {
                    toast.info("You Already Liked This Artifact")
                    return
                }
                else {
                    axiosInstanceSecure.patch(`/like/${id}`)
                        .then(res => {
                            console.log(res.data);
                        })
                    axiosInstanceNormal.get('/featured-artifacts')
                        .then(res => {
                            setArtifacts(res.data.data);
                            console.log(res.data.data);
                        })
                }
            })

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className='md:w-[80%] mx-auto mt-9'>
                <h2 className='text-3xl font-bold mb-5'>Featured Artifacts</h2>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                        <ReactLoading type="spin" color="red" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='md:w-[90%] mx-auto space-y-4'>
            <h2 className='text-3xl font-bold mb-5'>Featured Artifacts</h2>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {
                    artifacts.length > 0 && artifacts.map(artifact => <FeaturedArtifactsCard key={artifact._id} artifact={artifact} handleLike={handleLike}></FeaturedArtifactsCard>)
                }
            </div>
            <div className='flex justify-center'>
                <Link to={'/all-artifacts'} className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                    See All
                </Link>
            </div>
        </div>
    );
};

export default FeaturedArtifacts;