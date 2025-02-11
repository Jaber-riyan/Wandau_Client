import React, { useState } from "react";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import UseAxiosNormal from "../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal";
import Helmet from 'react-helmet';
import axios from "axios";
import { toast } from "react-toastify";

const AddArtifact = () => {
    const { user } = useAuth();
    const axiosInstanceNormal = UseAxiosNormal();
    const [imageUploading, setImageUploading] = useState(false);
    const [formData, setFormData] = useState({
        artifactName: "",
        artifactImage: "",
        artifactType: "",
        historicalContext: "",
        createdAt: "",
        discoveredAt: "",
        discoveredBy: "",
        presentLocation: "",
    });
    const ImageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageUploading(true);
        const imgData = new FormData();
        imgData.append("image", file);

        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, imgData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data.success) {
                setFormData({ ...formData, artifactImage: data.data.url });
                toast.success("Image uploaded!", "Your image has been hosted successfully.");
            } else {
                toast.error("Upload failed", "Image hosting failed, please try again.");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Error", "Could not upload image. Try again later.");
        } finally {
            setImageUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.artifactImage) {
            Swal.fire("Missing Image", "Please upload an image before submitting.", "info");
            return;
        }

        const addData = { 
            ...formData, 
            artifactAddedBy: user?.displayName, 
            email: user?.email, 
            likeCount: 0 
        };

        axiosInstanceNormal.post('/add-artifacts', addData)
            .then(res => {
                Swal.fire("Success", "Artifact added successfully", "success");
                setFormData({
                    artifactName: "",
                    artifactImage: "",
                    artifactType: "",
                    historicalContext: "",
                    createdAt: "",
                    discoveredAt: "",
                    discoveredBy: "",
                    presentLocation: "",
                });
            })
            .catch(err => {
                console.error(err.message);
                Swal.fire("Error", "Failed to add artifact. Try again later.", "error");
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-6 bg-gray-100 dark:bg-gray-900">
            <Helmet><title>Add Artifact | Wandau</title></Helmet>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-3xl">
            <div className='mb-10 mt-10'>
                <h2 className='md:text-4xl text-2xl dark:text-white text-center font-bold heading border-2 md:w-2/3 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    Add New Artifact
                </h2>
            </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(formData).map((key) => (
                        key !== "artifactImage" && (
                            <div key={key}>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                </label>
                                {key === "artifactType" ? (
                                    <select
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                                        required
                                    >
                                        <option value="">Select type</option>
                                        <option value="Tools">Tools</option>
                                        <option value="Weapons">Weapons</option>
                                        <option value="Documents">Documents</option>
                                        <option value="Writings">Writings</option>
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                                        placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                        required
                                    />
                                )}
                            </div>
                        )
                    ))}

                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Artifact Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            required
                        />
                        {imageUploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
                        {formData.artifactImage && (
                            <img src={formData.artifactImage} alt="Artifact" className="mt-2 w-32 h-32 object-cover rounded" />
                        )}
                    </div>

                    {/* Read-Only User Info */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Artifact Added By</label>
                        <input
                            type="text"
                            value={user?.displayName || "Anonymous"}
                            readOnly
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            value={user?.email || "N/A"}
                            readOnly
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded font-semibold transition ${
                            imageUploading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                        }`}
                        disabled={imageUploading}
                    >
                        {imageUploading ? "Uploading Image..." : "Add Artifact"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddArtifact;
