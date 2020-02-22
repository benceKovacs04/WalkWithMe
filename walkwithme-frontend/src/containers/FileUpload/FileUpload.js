import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.css";

export default function FileUpload() {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({});

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
