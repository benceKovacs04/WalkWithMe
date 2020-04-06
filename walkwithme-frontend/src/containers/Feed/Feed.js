import React, { useState, useContext, useEffect } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";

export default function Feed() {
    const { loggedIn } = useContext(LoggedInContext);

    const [imageDetails, setImageDetails] = useState([]);

    useEffect(() => {
        getNewImage();
    }, []);

    const getNewImage = () => {
        axios
            .get(
                "https://localhost:5001/api/imageservice/getrandomimagedetails",
                {
                    withCredentials: true
                }
            )
            .then(resp => {
                setImageDetails(resp.data);
            });
    };

    return (
        <div className={classes.Feed}>
            <div>
                {imageDetails.map(image => {
                    return <FeedItem newImage={getNewImage} image={image} />;
                })}
                {/* <FeedItem image={imageDetails} /> */}
            </div>
        </div>
    );
}
