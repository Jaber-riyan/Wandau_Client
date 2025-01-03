import React, { useEffect, useState } from 'react';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import FeaturedArtifactsCard from '../../Components/FeaturedArtifacts/FeaturedArtifactsCard/FeaturedArtifactsCard';
import ReactLoading from 'react-loading';

const AllArtifacts = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const [artifacts, setArtifacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return (
            <div className='md:w-[80%] mx-auto mt-9'>
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
            <h2 className='text-3xl font-bold mb-5 mt-4'>All Artifacts</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {
                    artifacts.length > 0 && artifacts.map(artifact => <FeaturedArtifactsCard key={artifact._id} artifact={artifact}></FeaturedArtifactsCard>)
                }
            </div>
        </div>
    );
};

export default AllArtifacts;