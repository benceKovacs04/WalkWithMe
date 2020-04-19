import React, { useState, useContext, useEffect, useRef } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";

import * as signalR from '@aspnet/signalr'
import addNotification from 'react-push-notification';

export default function Feed() {
    const { loggedIn } = useContext(LoggedInContext);

    const [imageDetails, setImageDetails] = useState([]);

    const connection = useRef();

    const notify = (from) => {
        addNotification({
            message: `${from} has walked with you!`,
            theme: "darkblue",
            native: false,
            duration: 5000,

        })
    }

    useEffect(() => {
        getNewImage();

        if (loggedIn) {
            connection.current = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/hubs/notification").build();

            connection.current.on("ReceiveWalkNotification", (from) => {
                //setWalkedWithMe(from)
                notify(from);
            })

            connection.current.start({ withcredentials: true }).catch(error => console.log(error));
        }

    }, []);

    const onWalk = (to) => {
        if (loggedIn && connection.current != null) {
            connection.current.invoke("SendWalkNotification", to)
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
                {imageDetails.map(image => {
                    return <FeedItem newImage={getNewImage} onWalk={onWalk} image={image} />;
                })}
            </div>
        </div>
    );
}
