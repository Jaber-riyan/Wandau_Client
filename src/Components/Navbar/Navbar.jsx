import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/Authentication";
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const { user, handleLogout, setUser } = useContext(AuthContext);

    // Theme State (default to light mode)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Apply theme to <html> element
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggle Theme Function
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // Logout Handler
    const logoutHandler = () => {
        handleLogout()
            .then(() => {
                Swal.fire({
                    title: "Logout Successfully",
                    icon: "success",
                });
                setUser(null);
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                toast.error(formattedError);
            });
    };

    // Navigation Links
    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `hover:text-[#4b4bed] font-[700] text-[14px] cursor-pointer 
            ${isActive ? 'active' : 'text-black dark:text-white'}`
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/all-artifacts"
                className={({ isActive }) =>
                    `hover:text-[#4b4bed] font-[700] text-[14px] cursor-pointer 
            ${isActive ? 'active' : 'text-black dark:text-white'}`
                }
            >
                All Artifacts
            </NavLink>

            <NavLink
                to="/add-artifacts"
                className={({ isActive }) =>
                    `hover:text-[#4b4bed] font-[700] text-[14px] cursor-pointer 
            ${isActive ? 'active' : 'text-black dark:text-white'}`
                }
            >
                Add Artifacts
            </NavLink>

            {user?.email ? (
                <>
                    <Link
                        onClick={logoutHandler}
                        className="hover:text-[#4b4bed] text-black dark:text-white font-[700] text-[14px] cursor-pointer"
                    >
                        Logout
                    </Link>

                    <div className="cursor-pointer">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1 text-black dark:text-white font-[700] text-[14px]">
                                My Profile
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 dark:bg-gray-800 rounded-box z-[1] w-52 p-2 shadow">
                                <li>
                                    <NavLink
                                        to="/my-artifacts"
                                        className={({ isActive }) =>
                                            `hover:text-[#4b4bed] font-[700] text-[14px] 
                                    ${isActive ? 'active' : 'text-black dark:text-white'}`
                                        }
                                    >
                                        My Artifacts
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/liked-artifacts"
                                        className={({ isActive }) =>
                                            `hover:text-[#4b4bed] font-[700] text-[14px] 
                                    ${isActive ? 'active' : 'text-black dark:text-white'}`
                                        }
                                    >
                                        Liked Artifacts
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <NavLink className="flex gap-2 justify-center items-center text-[14px]">
                        {user && (
                            <Link to="/my-profile" title={`${user.displayName}`}>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                        <img src={user.photoURL} alt="User profile" referrerPolicy="no-referrer" />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `hover:text-[#4b4bed] font-[700] text-[14px] cursor-pointer mr-2 
                    ${isActive ? 'active' : 'text-black dark:text-white'}`
                        }
                    >
                        Register
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `hover:text-[#4b4bed] font-[700] text-[14px] cursor-pointer 
                    ${isActive ? 'active' : 'text-black dark:text-white'}`
                        }
                    >
                        Login
                    </NavLink>
                </>
            )}
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="p-2 mt-2 text-black dark:text-white font-bold rounded-lg shadow-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </>

    );

    return (
        <div>
            <div className="md:w-[80%] mx-auto dm-sans-font">
                <nav>
                    <div className="navbar text-black dark:text-white">
                        <div className="navbar-start animate__animated animate__fadeInLeft">
                            <Link to="/">
                                <img className="md:w-2/6 w-32" src={`${theme == "dark" ? "https://i.ibb.co.com/jP9KY9sW/wandau-removebg-preview-1.png" : "https://i.ibb.co.com/W5mf58S/logo.png"}`} alt="Logo" />
                            </Link>
                        </div>
                        <div className="navbar-end flex items-center gap-4">
                            <div className="lg:block hidden animate__animated animate__fadeInRight">
                                <ul className="menu-horizontal p-2 space-x-3 items-center justify-center">{links}</ul>
                            </div>
                            <div className="dropdown">
                                <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul tabIndex="0" className="menu menu-sm dropdown-content bg-[#ffffff50] dark:bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow right-0">
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
