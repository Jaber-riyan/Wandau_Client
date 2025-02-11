import React, { useContext, useEffect, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/Authentication';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const Login = () => {
    const { handleLogin, user, googleRegister } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (user) {
            toast.info("You Logged in ");
            navigate(location?.state || '/');
        }
    }, [user, navigate, location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        if (password.length < 6) {
            toast.error("Password Should Be 6 Characters.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password Must have an Uppercase Letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password Must have a Lowercase Letter");
            return;
        }

        handleLogin(email, password)
            .then(res => {
                const user = res.user;
                Swal.fire({
                    title: 'Successfully Logged In!',
                    icon: 'success'
                })
                navigate(location?.state || '/');
            })
            .catch(error => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    ?.split("-")
                    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    ?.join(" ");
                toast.error(formattedError);
            })
    }

    const googleSignUp = () => {
        googleRegister()
            .then(res => {
                const user = res.user;
                Swal.fire({
                    title: 'Successfully Logged In!',
                    icon: 'success'
                })
                navigate(location?.state || '/');
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

    // Handle filling in the valid user credentials
    const fillValidUser = () => {
        emailRef.current.value = "jaberriyan357@gmail.com";
        passwordRef.current.value = "123456Jaa";
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 p-8 border-b-2 dark:border-gray-600 border-gray-400">
            <Helmet>
                <title>Login | Wandau</title>
            </Helmet>
            <form onSubmit={handleSubmit} className="w-full max-w-md py-12 px-8 space-y-6 bg-[#59dba5] dark:bg-[#2a3d47] rounded-lg shadow-lg animate__animated animate__zoomIn">
                <h2 className="text-2xl font-semibold text-center text-white">Login to Your Account</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 dark:text-gray-200" htmlFor="email">
                            Email Address
                        </label>
                        <div className="flex items-center mt-1">
                            <FiMail className="w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                name='email'
                                ref={emailRef} // reference the email input
                                placeholder="Enter your email address"
                                className="w-full px-4 py-2 ml-2 border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-[#59dba5] transition"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 dark:text-gray-200" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center mt-1">
                            <FiLock className="w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                name='password'
                                ref={passwordRef} // reference the password input
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 ml-2 border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-[#59dba5] transition"
                                required
                            />
                        </div>
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <Link className="underline text-[#ffffffce] dark:text-gray-200">
                        Forgot Password?
                    </Link>
                </p>

                <div className='flex gap-2'>
                    <button className="w-full py-2 mt-4 bg-gray-900 rounded-md hover:bg-gray-900 text-white dark:bg-gray-900 dark:hover:bg-[#202932] transition">
                        Login
                    </button>
                    <button
                        type="button"
                        className="w-full py-2 mt-4 bg-[#0ef] rounded-md hover:bg-[#00eeffa2] dark:text-white text-black font-semibold dark:bg-[#0ef] dark:hover:bg-[#00eeffa2] transition"
                        onClick={fillValidUser} // click handler for valid user button
                    >
                        Valid User
                    </button>
                </div>
                <div className="divider dark:border-gray-600"></div>

                <div className="flex justify-center">
                    <FcGoogle className="cursor-pointer" onClick={googleSignUp} size={40} />
                </div>

                <p className="mt-4 text-center text-sm text-gray-300 dark:text-gray-400">
                    Don't Have an Account?{' '}
                    <Link to="/register" className="text-red-500 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
