import React, { Fragment, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.css";
import axios from "axios";

export default function FileUpload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const upload = () => {
        const formData = new FormData();
        formData.append("image", image);
        axios.post(
            "https://localhost:5001/api/imageservice/uploadimage",
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    };

    const onDrop = useCallback(acceptedFiles => {
        {
            acceptedFiles.forEach(file => {
                setImage(file);
                const reader = new FileReader();
                reader.onload = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            });
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    return (
        <Fragment>
            <div className={classes.Upload} {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
            <img src={preview}></img>
        </Fragment>
    );
}
