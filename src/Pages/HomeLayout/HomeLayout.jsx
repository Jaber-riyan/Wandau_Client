import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { Helmet } from 'react-helmet';

const HomeLayout = () => {
    return (
        <div className='dm-sans-font'>
            <Helmet><title>Home | HireSphere</title></Helmet
            <header className='sticky top-0 z-10 border-2 rounded-lg backdrop-blur-sm bg-transparent'>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <footer className='dm-sans-font'>
                footer
            </footer>
        </div>
    );
};

export default HomeLayout;