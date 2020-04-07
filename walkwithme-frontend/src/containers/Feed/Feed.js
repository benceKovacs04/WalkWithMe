import React, { useState, useContext, useEffect } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";

import * as signalR from '@aspnet/signalr'

export default function Feed() {
    const { loggedIn } = useContext(LoggedInContext);

    const [imageDetails, setImageDetails] = useState([]);

    useEffect(() => {
        getNewImage();

        if (loggedIn) {
            const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/hubs/notifications").build();
            connection.start({ withcredentials: true });

        }
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
