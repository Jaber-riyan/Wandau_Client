import React, { useState } from "react";

const AddArtifact = ({ user }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.artifactImage.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/)) {
            alert("Please enter a valid image URL");
            return;
        }
        console.log("Form Submitted:", {
            ...formData,
            adderName: user.name,
            adderEmail: user.email,
        });
        // Add logic to send form data to your backend
        alert("Artifact successfully added!");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6 animate__animated animate__fadeInDown">
                    Add a New Artifact
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Artifact Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Artifact Name
                        </label>
                        <input
                            type="text"
                            name="artifactName"
                            value={formData.artifactName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter artifact name"
                            required
                        />
                    </div>

                    {/* Artifact Image */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Artifact Image (URL)
                        </label>
                        <input
                            type="url"
                            name="artifactImage"
                            value={formData.artifactImage}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter valid image URL"
                            required
                        />
                    </div>

                    {/* Artifact Type */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Artifact Type
                        </label>
                        <select
                            name="artifactType"
                            value={formData.artifactType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="Tools">Tools</option>
                            <option value="Weapons">Weapons</option>
                            <option value="Documents">Documents</option>
                            <option value="Writings">Writings</option>
                        </select>
                    </div>

                    {/* Historical Context */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Historical Context
                        </label>
                        <textarea
                            name="historicalContext"
                            value={formData.historicalContext}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter historical context"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    {/* Created At */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Created At (e.g., "100 BC")
                        </label>
                        <input
                            type="text"
                            name="createdAt"
                            value={formData.createdAt}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter creation date"
                            required
                        />
                    </div>

                    {/* Discovered At */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Discovered At (e.g., "1799")
                        </label>
                        <input
                            type="text"
                            name="discoveredAt"
                            value={formData.discoveredAt}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter discovery date"
                            required
                        />
                    </div>

                    {/* Discovered By */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Discovered By
                        </label>
                        <input
                            type="text"
                            name="discoveredBy"
                            value={formData.discoveredBy}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter discoverer's name"
                            required
                        />
                    </div>

                    {/* Present Location */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Present Location
                        </label>
                        <input
                            type="text"
                            name="presentLocation"
                            value={formData.presentLocation}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter present location"
                            required
                        />
                    </div>

                    {/* Artifact Adder Info */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Artifact Added By
                        </label>
                        <input
                            type="text"
                            value={user?.name || "Anonymous"}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || "N/A"}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Add Artifact
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddArtifact;
