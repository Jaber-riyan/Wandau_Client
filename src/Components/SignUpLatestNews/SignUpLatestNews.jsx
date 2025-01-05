import React from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';

const SignUpLatestNews = () => {
  return (
    <section className="bg-[#94ffc4] px-4 py-12 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 animate__animated animate__fadeInLeft">
        <h5 className="text-sm uppercase mb-2 cinzel-font">Subscribe Newsletter</h5>
        <h1 className="text-4xl lg:text-6xl font-medium mb-6 cinzel-font">
          Sign up to get the latest news
        </h1>
        <div className="flex items-center max-w-lg w-full">
          <input
            type="email"
            placeholder="Enter your e-mail address"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
          />
          <Link 
            to={'/register'}
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-all"
          >
            Sign Up
          </Link>
        </div>
        <p className="text-sm mt-3">
          Will be used in accordance with our{' '}
          <Link to={'/'} className="text-blue-600 underline">
            Privacy Policy
          </Link>
        </p>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 animate__animated animate__fadeInRight">
        <img
          src="https://i.ibb.co/885HhdH/newsletter-image.png"
          alt="Newsletter"
          className="w-full h-auto max-h-96 object-contain"
        />
      </div>
    </section>
  );
};

export default SignUpLatestNews;
 