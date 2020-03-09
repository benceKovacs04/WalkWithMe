import React, { useState, useContext, useEffect } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";
import FileUpload from "../FileUpload/FileUpload";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";

export default function Feed() {
    const { loggedIn } = useContext(LoggedInContext);

    const [imageDetails, setImageDetails] = useState([]);

    const getImageBaseUrl =
        "https://localhost:5001/api/imageservice/getimage?FileName=";

    useEffect(() => {
        axios
            .get("https://localhost:5001/api/imageservice/getimagedetails", {
                withCredentials: true
            })
            .then(resp => {
                setImageDetails(resp.data);
                console.log(resp.data);
            });
    }, []);

    return (
        <div className={classes.Feed + " row"}>
            <div className={classes.leftCol + " col-3"}>
                {loggedIn ? <FileUpload></FileUpload> : null}
            </div>
            <div className={"col-6"}>
                {imageDetails.map(image => {
                    return (
                        <FeedItem
                            title={image.title}
                            url={getImageBaseUrl + image.imageId}
                        />
                    );
                })}
            </div>
            <div className={"col-3"}></div>
        </div>
    );
}
