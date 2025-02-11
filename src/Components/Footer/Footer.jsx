import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider';

const Footer = () => {
    const { theme, setTheme } = useContext(ThemeContext);  // access theme and setTheme

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-10 text-gray-700 dark:text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center mb-10">
                    <Link to={"/"}>
                        {
                            theme === "light"
                                ? <img className="w-64" src="https://i.ibb.co.com/W5mf58S/logo.png" alt="Logo" />
                                : <img className="w-64" src="https://i.ibb.co.com/jP9KY9sW/wandau-removebg-preview-1.png" alt="Logo" />
                        }
                    </Link>
                </div>
                {/* Other content */}
                
                {/* Toggle button to switch themes */}
                <div className="flex justify-center mt-4">
                    <button onClick={toggleTheme} className="bg-gray-800 text-white px-4 py-2 rounded">
                        Toggle Theme
                    </button>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Copyright ©{new Date().getFullYear()} WANDAU. All Rights Reserved.</p>
                    <p>
                        Site created by{" "}
                        <Link to="https://www.facebook.com/jaberriyanyan" className="hover:underline hover:text-blue-400 hover:font-bold">
                            JABER AHMED RIYAN
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
