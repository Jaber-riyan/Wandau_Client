import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import ReactLoading from 'react-loading';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import AddedArtifactCard from './AddedArtifactCard/AddedArtifactCard';
import Swal from 'sweetalert2';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import Helmet from 'react-helmet';

const AddedArtifacts = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const axiosInstanceNormal = UseAxiosNormal();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [addedArtifacts, setAddedArtifacts] = useState([]);

    useEffect(() => {
        axiosInstanceSecure.get(`/user-added-artifacts/${user.email}`)
            .then(res => {
                setAddedArtifacts(res.data.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [axiosInstanceSecure, user.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete this artifact?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstanceNormal.delete(`/artifact-delete/${id}`)
                    .then(() => {
                        setAddedArtifacts(prevArtifacts => prevArtifacts.filter(artifact => artifact._id !== id));
                        Swal.fire("Deleted!", "The artifact has been removed.", "success");
                    });
            } else if (result.isDenied) {
                Swal.fire("Not Deleted", "", "info");
            }
        });
    };

    return (
        <div className='md:w-[80%] mx-auto mt-9 mb-10 dark:text-gray-200 min-h-screen'>
            <Helmet><title>Added Artifacts | Wandau</title></Helmet>
            <div className='mb-10'>
                <h2 className='md:text-4xl text-2xl text-center font-bold heading border-2 md:w-2/4 w-[70%] mx-auto py-4 border-[#0ef] border-dashed uppercase shadow-[0_0_15px_#0ef] rounded-2xl dark:shadow-[0_0_20px_#0ef] dark:border-[#0ef]'>
                    My Added Artifacts
                </h2>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <ReactLoading type="spin" color="red" height={50} width={50} />
                </div>
            ) : (
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    {addedArtifacts.length > 0 ? (
                        addedArtifacts.map(artifact => (
                            <AddedArtifactCard key={artifact._id} artifact={artifact} handleDelete={handleDelete} />
                        ))
                    ) : (
                        <h2 className='text-3xl font-bold text-red-600 text-center'>No Added Artifacts :(</h2>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddedArtifacts;