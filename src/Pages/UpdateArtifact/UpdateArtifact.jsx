import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import UseAxiosNormal from "../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import Helmet from 'react-helmet';

const UpdateArtifact = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const [artifact, setArtifact] = useState(null);
    const [formData, setFormData] = useState({});
    const [photo, setPhoto] = useState(null); // Store the selected photo
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstanceNormal.get(`artifact/${id}`)
            .then(res => {
                setArtifact(res.data.data);
                setFormData(res.data.data);  // Initialize formData with fetched artifact
            })
            .catch(err => console.error("Error fetching artifact:", err));
    }, [axiosInstanceNormal, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { artifactName, artifactImage, artifactType, historicalContext, createdAt, discoveredAt, discoveredBy, presentLocation } = formData;
        const updatedFields = { artifactName, artifactImage, artifactType, historicalContext, createdAt, discoveredAt, discoveredBy, presentLocation };

        // If a photo is selected, upload it to ImgBB
        if (photo) {
            const ImageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
            try {
                const formData = new FormData();
                formData.append("image", photo);
                const { data } = await axiosInstanceNormal.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                updatedFields.artifactImage = data.data.url; // Update the artifactImage field with the URL
            } catch (err) {
                console.error("Error uploading image:", err);
            }
        }

        // Send the updated fields
        axiosInstanceNormal.patch(`/artifact-update/${id}`, updatedFields)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: "Artifact updated successfully",
                    icon: "success"
                });
                navigate('/my-artifacts');
            })
            .catch(err => {
                console.error("Error updating artifact:", err);
                Swal.fire({
                    title: "Update failed",
                    text: "Please try again later",
                    icon: "error"
                });
            });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className='md:w-[80%] mx-auto mt-9'>
                <Helmet><title>Update Artifact | Wandau</title></Helmet>
                <h2 className='text-3xl font-bold mb-5'>My Added Artifacts</h2>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                        <ReactLoading type="spin" color="red" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
            <Helmet><title>Update Artifact | Wandau</title></Helmet>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-3xl">
            <div className='mb-10 mt-7'>
                <h2 className='md:text-4xl dark:text-white text-2xl text-center font-bold heading border-2 md:w-2/3 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    Update Artifact
                </h2>
            </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[{ label: "Artifact Name", name: "artifactName", type: "text", placeholder: "Enter artifact name" },
                      { label: "Created At", name: "createdAt", type: "text", placeholder: "Enter creation date" },
                      { label: "Discovered At", name: "discoveredAt", type: "text", placeholder: "Enter discovery date" },
                      { label: "Discovered By", name: "discoveredBy", type: "text", placeholder: "Enter discoverer's name" },
                      { label: "Present Location", name: "presentLocation", type: "text", placeholder: "Enter present location" }
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name}>
                            <label className="block text-gray-700 dark:text-white font-semibold mb-1">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name] || ""}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder={placeholder}
                                required
                            />
                        </div>
                    ))}

                    {/* Image Upload Input */}
                    <div>
                        <label className="block text-gray-700 dark:text-white font-semibold mb-1">Upload Artifact Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Display existing image URL if it exists */}
                    {formData.artifactImage && (
                        <div className="mt-4">
                            <img
                                src={formData.artifactImage}
                                alt="Artifact"
                                draggable="false"
                                onContextMenu={(e)=> e.preventDefault()}
                                className="w-32 object-cover rounded"
                            />
                        </div>
                    )}

                    {/* Artifact Type Dropdown */}
                    <div>
                        <label className="block text-gray-700 dark:text-white font-semibold mb-1">Artifact Type</label>
                        <select
                            name="artifactType"
                            value={formData.artifactType || ""}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="Tools">Tools</option>
                            <option value="Weapons">Weapons</option>
                            <option value="Documents">Documents</option>
                            <option value="Writings">Writings</option>
                        </select>
                    </div>

                    {/* Historical Context Textarea */}
                    <div>
                        <label className="block text-gray-700 dark:text-white font-semibold mb-1">Historical Context</label>
                        <textarea
                            name="historicalContext"
                            value={formData.historicalContext || ""}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter historical context"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                    >
                        Update Artifact
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateArtifact;
