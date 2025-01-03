import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-10 text-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Museum Section */}
                    <div>
                        <h3 className="cinzel-font text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
                            About Museum
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="hover:underline">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link to="/national-work" className="hover:underline">
                                    National work
                                </Link>
                            </li>
                            <li>
                                <Link to="/international-work" className="hover:underline">
                                    International work
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Us Section */}
                    <div>
                        <h3 className="cinzel-font text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
                            Connect Us
                        </h3>
                        <ul className="flex flex-col gap-y-4">
                            <li>
                                <Link
                                    to="https://www.facebook.com/jaberriyanyan"
                                    className="hover:text-blue-500 flex gap-x-3"
                                >
                                    <FaFacebook size={24} /> <span>Facebook</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/twitter"
                                    className="hover:text-blue-400 flex gap-x-3"
                                >
                                    <FaTwitter size={24} /> <span>Twitter</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://www.youtube.com/@jaberriyan"
                                    className="hover:text-red-500 flex gap-x-3"
                                >
                                    <FaYoutube size={24} /> <span>YouTube</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Visit Us Now Section */}
                    <div>
                        <h3 className="cinzel-font text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
                            Visit Us Now
                        </h3>
                        <p>
                            Cromwell Road New Town SW7
                            <br />
                            <strong>Sylhet – Bangladesh</strong>
                        </p>
                        <p className="mt-2 flex items-center space-x-2">
                            <span className="text-lg">📞</span>
                            <span>+8801723487696</span>
                        </p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 text-center text-sm text-gray-500">
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
