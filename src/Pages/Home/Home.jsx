import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import FeaturedArtifacts from '../../Components/FeaturedArtifacts/FeaturedArtifacts';
import ArtInspiration from '../../Components/ArtInspiration/ArtInspiration';
import SignUpLatestNews from '../../Components/SignUpLatestNews/SignUpLatestNews';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const checkInternet = async () => {
            try {
                // Test internet by fetching a small file (Google favicon)
                const response = await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
                setIsOnline(true);
            } catch (error) {
                setIsOnline(false);
                navigate('/no-internet'); // Redirect if offline
            }
        };

        // Check internet every 5 seconds
        const interval = setInterval(checkInternet, 1000);
        checkInternet(); // Run initially
        console.log(isOnline);

        return () => clearInterval(interval);
    }, [navigate, isOnline]);



    return (
        <div>
            <header
                className="relative flex items-center justify-center bg-cover bg-center min-h-screen text-gray-900 mb-6 border-b-2 dark:border-gray-600 border-gray-400"
                style={{ backgroundImage: `url('https://i.ibb.co.com/mCzDSZ5/closeup-of-ancient-stone-statue-with-golden-eyes-free-photo.jpg')` }}
            >
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/10 dark:bg-black/30"></div>

                {/* Banner Content */}
                <Banner></Banner>
            </header>

            <section className='mb-6 pb-7 border-b-2 dark:border-gray-600 border-gray-400'>
                <FeaturedArtifacts></FeaturedArtifacts>
            </section>
            <section className='border-b-2 dark:border-gray-600 border-gray-400'>
                <ArtInspiration></ArtInspiration>
            </section>
            <section className='border-b-2 dark:border-gray-600 border-gray-400'>
                <SignUpLatestNews></SignUpLatestNews>
            </section>
        </div>
    );
};

export default Home;