import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import FeaturedArtifactsCard from '../../Components/FeaturedArtifacts/FeaturedArtifactsCard/FeaturedArtifactsCard';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';



const LikedArtifacts = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const axiosInstanceNormal = UseAxiosNormal();
    const { user } = useAuth();
    const [likedArtifacts, setLikedArtifacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (user?.email) {
            axiosInstanceSecure.get(`/liked-artifacts/${user.email}`)
                .then(res => {
                    setLikedArtifacts(res.data.data);
                })
                .catch(err => console.error("Error fetching liked artifacts:", err));
        }
    }, [axiosInstanceSecure, user?.email]);

    const handleLike = (id) => {
        toast.info("Just Readable!!")
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className='md:w-[80%] mx-auto mt-9'>
                <h2 className='text-3xl font-bold mb-5'>Liked Artifacts</h2>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                        <ReactLoading type="spin" color="red" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:w-[80%] mx-auto mt-9">
            <h1 className="text-3xl font-bold mb-4">Liked Artifacts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
    );
};

const ArtifactLoader = ({ artifactId, handleLike, axiosInstance }) => {
    const [artifact, setArtifact] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/artifact/${artifactId}`)
            .then(res => setArtifact(res.data.data))
            .catch(err => console.error("Error fetching artifact:", err));
    }, [artifactId, axiosInstance]);

    return artifact && (
        <FeaturedArtifactsCard handleLike={handleLike} artifact={artifact} />
    )
};

export default LikedArtifacts;
