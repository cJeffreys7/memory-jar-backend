import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

import './styles.scss'

const Dropzone = ({ jarId }) => {
    const [image, setImage] = useState('');

    const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
    setImage(URL.createObjectURL(file));
    const formData = new FormData();
    // file param must be the same as api param
    formData.append("file", file);
    // axios.post(
    //     `http://localhost:8080/jars/upload/${jarId}/memories`,
    //     formData,
    //     {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     }
    // ).then(() => {
    //     console.log('file uploaded successfully');
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className='dropzone-wrapper' {...getRootProps()}>
            <input {...getInputProps()} />
            {image && <img className='file-preview' src={image} alt="Uploaded file preview" />}
            <p className='dropzone-text'>Drag 'n' drop some files here, or click to select files</p>
            {/* {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            } */}
        </div>
    );
};

export default Dropzone;