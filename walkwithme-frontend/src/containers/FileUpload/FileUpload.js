import React, { Fragment, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.css";
import axios from "axios";
import EXIF from "exif-js";

export default function FileUpload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [orientation, setOrientation] = useState(null);
    const [rotation, setRotation] = useState(null);

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

    const rotateImageClass = () => {
        switch (orientation) {
            case 3:
                return classes.rotate180;
            case 6:
                return classes.rotate90;
            case 8:
                return classes.rotate270;
        }
    };

    const onDrop = useCallback(acceptedFiles => {
        {
            acceptedFiles.forEach(file => {
                const readerTwo = new FileReader();
                readerTwo.onload = () => {
                    setOrientation(
                        EXIF.readFromBinaryFile(readerTwo.result).Orientation
                    );
                };
                readerTwo.readAsArrayBuffer(file);

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
        <div className={classes.Upload}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
            {preview ? (
                <img className={rotateImageClass()} src={preview} />
            ) : null}
            {preview ? <input type="text" placeholder="Title"></input> : null}
        </div>
    );
}
