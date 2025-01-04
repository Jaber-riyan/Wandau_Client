import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import ReactLoading from 'react-loading';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import AddedArtifactCard from './AddedArtifactCard/AddedArtifactCard';
import Swal from 'sweetalert2';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import Helmet from 'react-helmet'

const AddedArtifacts = () => {
    const axiosInstanceSecure = UseAxiosSecure()
    const axiosInstanceNormal = UseAxiosNormal();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [addedArtifacts, setAddedArtifacts] = useState([]);


    useEffect(() => {
        axiosInstanceSecure.get(`/user-added-artifacts/${user.email}`)
            .then(res => {
                // console.log(res.data.data);
                setAddedArtifacts(res.data.data);
            })
    }, [axiosInstanceSecure, user.email, user.displayName])


    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete this artifact?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosInstanceNormal.delete(`/artifact-delete/${id}`)
                    .then(res => {
                        console.log(res.data);
                        const remaining = addedArtifacts.filter(artifact => artifact._id !== id);
                        setAddedArtifacts(remaining);
                        Swal.fire("Delete!", "", "success");
                    })
            } else if (result.isDenied) {
                Swal.fire("Not Delete", "", "info");
            }
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className='md:w-[80%] mx-auto mt-9'>
                <Helmet><title>Added Artifacts | Wandau</title></Helmet>
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
        <div className='md:w-[80%] mx-auto mt-9 mb-10'>
            <Helmet><title>Added Artifacts | Wandau</title></Helmet>
            <h2 className='text-3xl font-bold mb-5'>My Added Artifacts</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {
                    addedArtifacts.length > 0 ? addedArtifacts.map(artifact => <AddedArtifactCard key={artifact._id} artifact={artifact} handleDelete={handleDelete}></AddedArtifactCard>)
                        :
                        <h2 className='text-3xl font-bold mb-5 text-red-600'>No Added Artifact :(</h2>
                }
            </div>
        </div>
    );
};

export default AddedArtifacts;