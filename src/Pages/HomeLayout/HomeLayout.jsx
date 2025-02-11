import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { Helmet } from 'react-helmet';
import Footer from '../../Components/Footer/Footer';

const HomeLayout = () => {
    return (
        <div className='dm-sans-font'>
            <Helmet><title>Home | Wandau</title></Helmet>
            <header className='sticky top-0 z-10 backdrop-blur-sm bg-transparent'>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <footer className='dm-sans-font'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;