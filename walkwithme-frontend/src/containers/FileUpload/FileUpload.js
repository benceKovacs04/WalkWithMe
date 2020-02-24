import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.css";
import EXIF from "exif-js";
import axios from "axios";

export default function FileUpload() {
    const onDrop = useCallback(acceptedFiles => {
        {
            acceptedFiles.forEach(file => {
                const reader = new FileReader();

                reader.onabort = () => console.log("file reading was aborted");
                reader.onerror = () => console.log("file reading has failed");
                reader.onload = () => {
                    // Do whatever you want with the file contents

                    let base64str = reader.result;
                    const n = base64str.indexOf("base64,");
                    base64str = base64str.substring(n + 7, base64str.length);

                    axios.post("https://localhost:5001/api/imageservice/test", {
                        image: base64str
                    });
                };
                reader.readAsDataURL(file);
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
