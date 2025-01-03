import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Authentication/Authentication';
import { signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.config';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';


const Register = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleRegister, setUser, user, googleRegister } = useContext(AuthContext);

    // redirect if user already logged in 
    useEffect(() => {
        if (user) {
            toast.info("You Logged in ")
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        const photoURL = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        // console.log({ name, photoURL, email, password });

        if (password.length < 6) {
            toast.error("Password Should Be 6 Character.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password Must have an Uppercase Letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password Must have an Lowercase Letter");
            return;
        }

        handleRegister(email, password)
            .then(result => {
                // console.log(result.user);
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photoURL
                })
                signOut(auth).then(result => { });
                if (data.result.insertedId) {
                    Swal.fire({
                        title: 'Successfully created Account!',
                        icon: 'success'
                    })
                }


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

    const googleSignUp = () => {
        googleRegister()
            .then(res => {
                console.log(res.user);
                const user = res.user;
                Swal.fire({
                    title: 'Successfully Login!',
                    icon: 'success'
                })

                navigate('/');
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#ffffff] p-8 rounded-lg ">
            <Helmet>
                <title>Register | Wandau</title>
            </Helmet>
            <div className="w-full max-w-md p-8 space-y-6 shadow-lg bg-[#59dba5] rounded-lg animate__animated animate__zoomIn">
                <h2 className="text-2xl font-semibold text-center text-[#ffffffce]">Register Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#ffffffce]" htmlFor="name">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] focus:border-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#ffffffce]" htmlFor="photo">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            placeholder="Enter photo URL"
                            className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] focus:border-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#ffffffce]" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] focus:border-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#ffffffce]" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] focus:border-gray-400"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={acceptedTerms}
                            onChange={() => setAcceptedTerms(!acceptedTerms)}
                            className="w-4 h-4 mr-2 text-gray-800 border-gray-300 rounded focus:ring-0"
                        />
                        <label htmlFor="terms" className="text-sm text-[#ffffffb0]">
                            Accept <span className="font-bold text-[#ffffffce]">Terms & Conditions</span>
                        </label>
                    </div>
                    <button
                        disabled={!acceptedTerms}
                        className={`w-full py-2 mt-4 text-white rounded-md ${acceptedTerms ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Register
                    </button>
                </form>
                <div className="divider"></div>
                <div className='flex justify-center'>
                    <FcGoogle className='cursor-pointer' onClick={googleSignUp} size={40} />
                </div>

                <p className="mt-4 text-center text-sm text-[#ffffffce]">
                    Already Have An Account?{' '}
                    <Link to="/login" className="text-red-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;