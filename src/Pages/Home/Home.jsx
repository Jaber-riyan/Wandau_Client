import React from 'react';
import Banner from '../../Components/Banner/Banner';
import FeaturedArtifacts from '../../Components/FeaturedArtifacts/FeaturedArtifacts';

const Home = () => {
    return (
        <div>
            <header className="relative flex items-center justify-center bg-cover bg-center min-h-screen text-gray-900" style={{ backgroundImage: `url('https://i.ibb.co.com/mCzDSZ5/closeup-of-ancient-stone-statue-with-golden-eyes-free-photo.jpg')` }}>
                <Banner></Banner>
            </header>
            <section>
                <FeaturedArtifacts></FeaturedArtifacts>
            </section>
        </div>
    );
};

export default Home;