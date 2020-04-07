import React, { useState, useContext, useEffect } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";

import * as signalR from '@aspnet/signalr'

export default function Feed() {
    const { loggedIn } = useContext(LoggedInContext);

    const [imageDetails, setImageDetails] = useState([]);
    const [walkedWithMe, setWalkedWithMe] = useState("")

    let connection = null;

    if (loggedIn) {
        connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/hubs/notification").build();

        connection.on("ReceiveWalkNotification", (from) => {
            setWalkedWithMe(from)
        })

        connection.start({ withcredentials: true }).catch(error => console.log(error));
    }

    useEffect(() => {
        getNewImage();
    }, []);

    const onWalk = (to) => {
        if (loggedIn && connection != null) {
            connection.invoke("SendWalkNotification", to)
        }
    }

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
                <h1>{walkedWithMe}</h1>
                {imageDetails.map(image => {
                    return <FeedItem newImage={getNewImage} onWalk={onWalk} image={image} />;
                })}
                {/* <FeedItem image={imageDetails} /> */}
            </div>
        </div>
    );
}
