import React, { Fragment, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.css";
import axios from "axios";
import EXIF from "exif-js";

export default function FileUpload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [orientation, setOrientation] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(null);

    const upload = () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        axios
            .post(
                "https://localhost:5001/api/imageservice/uploadimage",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            .then(setMessage("*Uploading!"))
            .then(resp => {
                if (resp.status === 200) {
                    setMessage("Image successfully uploaded");
                    setPreview(null);
                    setImage(null);
                    setTitle("");
                    setDescription("");
                }
            })
            .catch(error => {
                setMessage("Something went wrong, please try again!");
            });
    };

    const cancel = () => {
        setPreview(null);
        setImage(null);
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

    const changeTitle = e => {
        setTitle(e.target.value);
    };

    const changeDescription = e => {
        setDescription(e.target.value);
    };

    const onDrop = useCallback(acceptedFiles => {
        {
            setMessage(null);
            if (acceptedFiles.length > 1) {
                setMessage("*You can only select one image at a time!");
                return;
            }
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
        <Fragment>
            <div className={classes.Opacity}></div>
            <div className={classes.Container}>
                <div className={classes.Upload}>
                    <div className={classes.Drag} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the picture here ...</p>
                        ) : (
                            <p>
                                Drag 'n' drop an image here, or click to select
                                the image
                            </p>
                        )}
                    </div>
                    {preview ? (
                        <img className={rotateImageClass()} src={preview} />
                    ) : null}

                    <div className={classes.Actions}>
                        <button onClick={() => (window.location = "/")}>
                            Go Back!
                        </button>
                        {preview ? (
                            <button onClick={upload}>Upload!</button>
                        ) : null}
                        {preview ? (
                            <button onClick={cancel}>Cancel</button>
                        ) : null}
                    </div>
                </div>
                <div className={classes.Text}>
                    <input
                        value={title}
                        onChange={changeTitle}
                        type="text"
                        placeholder="Title"
                        maxlength="90"
                    ></input>
                    <span>{title.length} / 90 characters</span>
                    <textarea
                        value={description}
                        onChange={changeDescription}
                        className={classes.Description}
                        maxlength="1500"
                    ></textarea>
                    <span>{description.length} / 1500 characters</span>
                    {message ? <h3>{message}</h3> : null}
                </div>
            </div>
        </Fragment>
    );
}
