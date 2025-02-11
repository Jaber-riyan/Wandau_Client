import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    // Theme State (default to light mode)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-10 text-gray-700 dark:text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center mb-10">
                    <Link to={"/"}>
                        <img className="w-64" src={`${theme == "dark" ? "https://i.ibb.co.com/jP9KY9sW/wandau-removebg-preview-1.png" : "https://i.ibb.co.com/W5mf58S/logo.png"}`} alt="Logo" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Museum Section */}
                    <div>
                        <h3 className="cinzel-font text-lg font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800 dark:text-white">
                            About Museum
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="hover:underline text-gray-700 dark:text-gray-300">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline text-gray-700 dark:text-gray-300">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link to="/national-work" className="hover:underline text-gray-700 dark:text-gray-300">
                                    National work
                                </Link>
                            </li>
                            <li>
                                <Link to="/international-work" className="hover:underline text-gray-700 dark:text-gray-300">
                                    International work
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Us Section */}
                    <div>
                        <h3 className="cinzel-font text-lg font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800 dark:text-white">
                            Connect Us
                        </h3>
                        <ul className="flex flex-col gap-y-4">
                            <li>
                                <Link
                                    to="https://www.facebook.com/jaberriyanyan"
                                    className="hover:text-blue-500 flex gap-x-3 text-gray-700 dark:text-gray-300"
                                >
                                    <FaFacebook size={24} /> <span>Facebook</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/twitter"
                                    className="hover:text-blue-400 flex gap-x-3 text-gray-700 dark:text-gray-300"
                                >
                                    <FaTwitter size={24} /> <span>Twitter</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://www.youtube.com/@jaberriyan"
                                    className="hover:text-red-500 flex gap-x-3 text-gray-700 dark:text-gray-300"
                                >
                                    <FaYoutube size={24} /> <span>YouTube</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Visit Us Now Section */}
                    <div>
                        <h3 className="cinzel-font text-lg font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800 dark:text-white">
                            Visit Us Now
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Cromwell Road New Town SW7
                            <br />
                            <strong>Sylhet – Bangladesh</strong>
                        </p>
                        <p className="mt-2 flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <span className="text-lg">📞</span>
                            <span>+8801723487696</span>
                        </p>
                    </div>
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
