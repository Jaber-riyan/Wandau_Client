import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Authentication/Authentication';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, handleLogout, setUser } = useContext(AuthContext);
    // console.log(user);
    const logoutHandler = () => {
        handleLogout()
            .then(res => {
                Swal.fire({
                    title: "Logout Successfully",
                    icon: 'success'
                })
                setUser(null);
                navigate('/login');
            })
            .catch(error => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                toast.error(formattedError);
            })

    }

    const links = <>
        <NavLink to={'/'}
            className="hover:text-[#4b4bed] text-black font-[700] text-[14px] cursor-pointer">
            Home
        </NavLink>
        <NavLink to={'/all-artifacts'}
            className="hover:text-[#4b4bed] text-black font-[700] text-[14px] cursor-pointer">
            All Artifacts
        </NavLink>
        <NavLink to={'/add-artifacts'}
            className="hover:text-[#4b4bed] text-black font-[700] text-[14px] cursor-pointer">
            Add Artifacts
        </NavLink>

        {
            user?.email ?
                <>
                    <Link onClick={logoutHandler}
                        className="hover:text-[#4b4bed] text-black font-[700] text-[14px] cursor-pointer">
                        Logout
                    </Link>
                    <div
                        className="cursor-pointer">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1 text-black font-[700] text-[14px]">My Profile </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><Link to={'/my-artifacts'} className='text-black font-[700] text-[14px] hover:text-[#4b4bed]'>My Artifacts</Link></li>
                                <li><Link to={'/liked-artifacts'} className='text-black font-[700] text-[14px] hover:text-[#4b4bed]'>Liked Artifacts</Link></li>
                            </ul>
                        </div>
                    </div>
                    <NavLink
                        className="flex gap-2 justify-center items-center text-[14px]">
                        {user &&
                            <Link to={'/my-profile'} title={`${user.displayName}`}>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                        <img
                                            src={user.photoURL}
                                            alt="User profile"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                </div>
                            </Link>}
                    </NavLink>

                </> :
                <>
                    <NavLink to={'/register'}
                        className="hover:text-[#4b4bed] text-black font-[700] text-[14px] cursor-pointer mr-2">
                        Register
                    </NavLink>
                    <NavLink to={'/login'}
                        className="hover:text-[#4b4bed] text-black font-[700] text-[14px] cursor-pointer">
                        Login
                    </NavLink>
                </>
        }

    </>
    return (
        <div>
            <div className='md:w-[80%] mx-auto dm-sans-font'>
                <nav>
                    <div className="navbar text-black">
                        <div className="navbar-start animate__animated animate__fadeInLeft">
                            <Link to={'/'}> <img className='md:w-2/6 w-32' src="https://i.ibb.co.com/W5mf58S/logo.png" alt="" /> </Link>
                        </div>
                        <div className="navbar-end">
                            <div className="lg:block hidden animate__animated animate__fadeInRight">
                                <ul className="menu-horizontal p-2 space-x-3 items-center justify-center">
                                    {links}
                                </ul>
                            </div>
                            <div className="dropdown">
                                <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-[#ffffff50] rounded-box z-[1] mt-3 w-52 p-2 shadow right-0">
                                    {links}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;