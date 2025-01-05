import React from 'react';
import 'animate.css';
import { FaDotCircle } from 'react-icons/fa';

const ArtInspiration = () => {
    return (
        <section className="px-4 py-12 md:px-12 lg:px-20 bg-gray-50 text-gray-800">
            <div className="text-center mb-12">
                <div className='flex justify-center mb-9'>
                    <img className='w-20' src="https://i.ibb.co.com/XkgZtmJ/title-shape.png" alt="" />
                </div>
                <h1 className="cinzel-font text-4xl lg:text-6xl md:w-[60%] mx-auto font-medium animate__animated animate__fadeInUp">
                    Art Inspiration of 19th Century
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="animate__animated animate__fadeInLeft">
                    <h2 className="text-xl font-semibold mb-4 uppercase">The Challenge</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <FaDotCircle className="text-lg mr-2 text-gray-500" />
                            <span>
                                In the 1980s, "the UK’s national museums faced political pressure from the{' '}
                                <span className="font-semibold">Conservative</span> government to charge for admission, to make
                                them less dependent on government funding."
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <h2 className="text-xl font-semibold mb-4 uppercase">The Initiative</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <FaDotCircle className="text-lg mr-2 text-gray-500" />
                            <span>
                                In 1997, the new Labour government made a commitment to reinstate free entry for{' '}
                                <span className="font-semibold">national</span> museums to attract a more diverse range of
                                visitors. This followed a campaign led by the museums themselves.
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="animate__animated animate__fadeInRight">
                    <h2 className="text-xl font-semibold mb-4 uppercase">The Impact</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <FaDotCircle className="text-lg mr-2 text-gray-500" />
                            <span>
                                National museums that dropped charges saw substantial visitor increases, averaging a{' '}
                                <span className="font-semibold">70%</span> rise. In the first year after free admission, this
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
