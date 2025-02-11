import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import FeaturedArtifactsCard from '../../Components/FeaturedArtifacts/FeaturedArtifactsCard/FeaturedArtifactsCard';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import Helmet from 'react-helmet';
import LoadingSkeleton from 'react-loading-skeleton';

const LikedArtifacts = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const axiosInstanceNormal = UseAxiosNormal();
    const { user } = useAuth();
    const [likedArtifacts, setLikedArtifacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch liked artifacts when user is available
    useEffect(() => {
        if (user?.email) {
            axiosInstanceSecure.get(`/liked-artifacts/${user.email}`)
                .then(res => {
                    setLikedArtifacts(res.data.data);
                    setIsLoading(false); // Set loading to false after data fetch
                })
                .catch(err => {
                    console.error("Error fetching liked artifacts:", err);
                    setIsLoading(false); // Handle error case as well
                });
        }
    }, [axiosInstanceSecure, user?.email]);

    const handleLike = (id) => {
        toast.success("Artifact Liked Successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
        });
    };

    return (
        <div className="p-4 w-[90%] mx-auto mt-9">
            <Helmet>
                <title>Liked Artifacts</title>
            </Helmet>
            <div className='mb-10 mt-7'>
                <h2 className='md:text-4xl dark:text-white text-2xl text-center font-bold heading border-2 md:w-2/4 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    Liked Artifacts
                </h2>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-lg">
                            <LoadingSkeleton height={200} width="100%" />
                            <LoadingSkeleton width="80%" />
                            <LoadingSkeleton width="60%" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {likedArtifacts.length > 0 ? (
                        likedArtifacts.map(likeArtifact => (
                            <ArtifactLoader
                                key={likeArtifact.likeArtifact}
                                artifactId={likeArtifact.likeArtifact}
                                handleLike={handleLike}
                                axiosInstance={axiosInstanceNormal}
                            />
                        ))
                    ) : (
                        <h2 className='text-3xl font-bold mb-5 text-red-500'>No liked artifacts found :(</h2>
                    )}
                </div>
            )}
        </div>
    );
};

const ArtifactLoader = ({ artifactId, handleLike, axiosInstance }) => {
    const [artifact, setArtifact] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get(`/artifact/${artifactId}`)
            .then(res => {
                setArtifact(res.data.data);
                setIsLoading(false); // Stop loading after data is fetched
            })
            .catch(err => {
                console.error("Error fetching artifact:", err);
                setIsLoading(false); // Handle error state
            });
    }, [artifactId, axiosInstance]);

    return isLoading ? (
        <div className="bg-white p-4 rounded-xl shadow-lg">
            <LoadingSkeleton height={200} width="100%" />
            <LoadingSkeleton width="80%" />
            <LoadingSkeleton width="60%" />
        </div>
    ) : (
        artifact && <FeaturedArtifactsCard handleLike={handleLike} artifact={artifact} />
    );
};

export default LikedArtifacts;
