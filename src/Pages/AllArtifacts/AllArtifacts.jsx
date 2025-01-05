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
        axiosInstanceNormal.get('/artifacts').then(res => {
            setArtifacts(res.data.data);
        });
    }, [axiosInstanceNormal]);

    useEffect(() => {
        // if (searchValue.trim() === '') {
        //     axiosInstanceNormal.get('/artifacts').then(res => {
        //         setArtifacts(res.data.data);
        //     });
        //     return
        // }
        setIsLoading(true);
        axiosInstanceNormal
            .get(`/artifacts-search?search=${searchValue}`)
            .then(res => {
                setArtifacts(res.data.data);
                setIsLoading(false);
            });

    }, [axiosInstanceNormal, searchValue]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

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
        axiosInstanceNormal.get('/artifacts').then(res => {
            setArtifacts(res.data.data);
        });
    };

    if (isLoading) {
        return (
            <div className="md:w-[80%] mx-auto mt-9">
                <Helmet>
                    <title>All Artifacts | Wandau</title>
                </Helmet>
                <h2 className="text-3xl font-bold mb-5">All Artifacts</h2>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                        <ReactLoading type="spin" color="red" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="md:w-[90%] mx-auto mb-6">
            <Helmet>
                <title>All Artifacts | Wandau</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-5 mt-4">All Artifacts</h2>
            <div className="flex items-center mb-5">
                <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Type name artifacts..."
                    className="input input-bordered w-full max-w-xs mr-3"
                />
                <button onClick={handleReset} className="btn bg-black/80 text-white">
                    Reset
                </button>
            </div>

            {artifacts?.length > 0 ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {artifacts.map((artifact) => (
                        <FeaturedArtifactsCard key={artifact._id} artifact={artifact} handleLike={handleLike} />
                    ))}
                </div>
            ) : (
                <h2 className="text-3xl font-bold mb-5 text-red-500">
                    No Artifacts Found by this name: "{searchValue}" :(
                </h2>
            )}


        </div>
    );
};

export default AllArtifacts;
