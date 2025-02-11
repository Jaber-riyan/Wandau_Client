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
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstanceNormal.get('/featured-artifacts')
            .then(res => {
                setArtifacts(res.data.data);
                // console.log(res.data.data);
            })
    }, [axiosInstanceNormal])


    const handleLike = (id) => {
        // console.log(id);
        if(!user) {
            toast.info("Please login first!")
            return navigate("/login")
        }
        const body = { likeArtifact: id, user: user?.email, userName: user?.displayName }
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
            <Loading text={"Featured Artifacts"}></Loading>
        );
    }

    return (
        <div className='w-[90%] mx-auto space-y-4'>
            <h2 className='text-3xl font-bold mb-5 dark:text-white heading'>Featured Artifacts</h2>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    artifacts.length > 0 && artifacts.map(artifact => <FeaturedArtifactsCard key={artifact._id} artifact={artifact} handleLike={handleLike}></FeaturedArtifactsCard>)
                }
            </div>
            <div className='flex justify-center'>
                <Link to={'/all-artifacts'} className="mt-7 px-9 py-2 ml-2 bg-[#0ef] dark:bg-[#00bcd4] rounded-3xl text-black dark:text-white font-bold
                                shadow-[0_0_5px_#0ef,0_0_25px_#0ef] dark:shadow-[0_0_5px_#00bcd4,0_0_25px_#00bcd4]
                                hover:bg-[#00ffff] dark:hover:bg-[#00ffff] hover:shadow-[0_0_5px_#00ffff,0_0_25px_#00ffff] 
                                dark:hover:shadow-[0_0_5px_#00ffff,0_0_25px_#00ffff] 
                                transition-all duration-300 animate__animated animate__heartBeat animate__infinite">
                    See All
                </Link>
            </div>
        </div>
    );
};

export default FeaturedArtifacts;