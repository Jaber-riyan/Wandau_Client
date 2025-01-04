import React, { useEffect, useState } from 'react';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import FeaturedArtifactsCard from '../../Components/FeaturedArtifacts/FeaturedArtifactsCard/FeaturedArtifactsCard';
import ReactLoading from 'react-loading';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet'

const AllArtifacts = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const [artifacts, setArtifacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        axiosInstanceNormal.get('/artifacts')
            .then(res => {
                console.log(res.data.data);
                setArtifacts(res.data.data);
            })
    }, [axiosInstanceNormal])
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLike = (id) => {
        // console.log(id);
        const body = { likeArtifact: id, user: user?.email }
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
                    axiosInstanceNormal.get('/artifacts')
                        .then(res => {
                            setArtifacts(res.data.data);
                            console.log(res.data.data);
                        })
                }
            })

    }

    if (isLoading) {
        return (
            <div className='md:w-[80%] mx-auto mt-9'>
                <Helmet><title>All Artifacts | Wandau</title></Helmet>
                <h2 className='text-3xl font-bold mb-5'>All Artifacts</h2>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                        <ReactLoading type="spin" color="red" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='md:w-[90%] mx-auto mb-6'>
            <Helmet><title>All Artifacts | Wandau</title></Helmet>
            <h2 className='text-3xl font-bold mb-5 mt-4'>All Artifacts</h2>
            <div>
                <input type="text" placeholder="Type name artifacts...." className="input input-bordered w-full max-w-xs mb-5" />
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {
                    artifacts.length > 0 && artifacts.map(artifact => <FeaturedArtifactsCard key={artifact._id} artifact={artifact} handleLike={handleLike}></FeaturedArtifactsCard>)
                }
            </div>
        </div>
    );
};

export default AllArtifacts;