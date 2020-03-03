import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.css";
import EXIF from "exif-js";
import axios from "axios";

export default function FileUpload() {
    const onDrop = useCallback(acceptedFiles => {
        {
            acceptedFiles.forEach(file => {
                const formData = new FormData();
                formData.append("image", file);
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
            });
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    return (
        <div className={classes.Upload} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
}
