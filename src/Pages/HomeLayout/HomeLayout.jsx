import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { Helmet } from 'react-helmet';
import Footer from '../../Components/Footer/Footer';

const HomeLayout = () => {
   
    return (
        <div className='dm-sans-font dark:bg-[#1e2a47]'>
            <Helmet><title>Home | Wandau</title></Helmet>
            <header className='sticky top-0 z-10 border-b dark:border-gray-700 bg-white/20 dark:bg-gray-800/70 backdrop-blur-md'>
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