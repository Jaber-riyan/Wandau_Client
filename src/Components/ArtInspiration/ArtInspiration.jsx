import React from 'react';
import 'animate.css';
import { FaDotCircle } from 'react-icons/fa';

const ArtInspiration = () => {
    return (
        <section className="px-4 py-12 md:px-12 lg:px-20 text-gray-800 dark:text-white">
            <div className="text-center mb-12">
                <div className='flex justify-center mb-9'>
                    <img className='w-20 dark:shadow-[0_0_20px_#fff] rounded-full' draggable="false" onContextMenu={(e)=>e.preventDefault()} src="https://i.ibb.co.com/XkgZtmJ/title-shape.png" alt="" />
                </div>
                <h1 className="cinzel-font text-4xl lg:text-6xl md:w-[60%] mx-auto font-medium animate__animated animate__fadeInUp dark:text-white heading">
                    Art Inspiration of 19th Century
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="animate__animated animate__fadeInLeft">
                    <h2 className="text-xl font-semibold mb-4 uppercase dark:text-white">The Challenge</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <FaDotCircle className="text-lg mr-2 text-gray-500 dark:text-gray-300" />
                            <span>
                                In the 1980s, "the UK’s national museums faced political pressure from the{' '}
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Conservative</span> government to charge for admission, to make
                                them less dependent on government funding."
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <h2 className="text-xl font-semibold mb-4 uppercase dark:text-white">The Initiative</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <FaDotCircle className="text-lg mr-2 text-gray-500 dark:text-gray-300" />
                            <span>
                                In 1997, the new Labour government made a commitment to reinstate free entry for{' '}
                                <span className="font-semibold text-gray-700 dark:text-gray-200">national</span> museums to attract a more diverse range of
                                visitors. This followed a campaign led by the museums themselves.
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="animate__animated animate__fadeInRight">
                    <h2 className="text-xl font-semibold mb-4 uppercase dark:text-white">The Impact</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <FaDotCircle className="text-lg mr-2 text-gray-500 dark:text-gray-300" />
                            <span>
                                National museums that dropped charges saw substantial visitor increases, averaging a{' '}
                                <span className="font-semibold text-gray-700 dark:text-gray-200">70%</span> rise. In the first year after free admission, this
                                trend continued significantly.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ArtInspiration;
