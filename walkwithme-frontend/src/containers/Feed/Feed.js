import React, { useState, useContext } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";
import FileUpload from "../FileUpload/FileUpload";
import LoggedInContext from "../../context/LoggedInContext";

export default function Feed() {
    const { loggedIn } = useContext(LoggedInContext);

    return (
        <div className={classes.Feed + " row"}>
            <div className={classes.leftCol + " col-3"}>
                {/*}   {loggedIn ? <FileUpload></FileUpload> : null} */}
                <FileUpload></FileUpload>
            </div>
            <div className={"col-6"}>
                <FeedItem
                    title="image one"
                    url="https://localhost:5001/api/imageservice/getimage?FileName=e15464b0-0f16-4254-9c6a-4414ce3372e1"
                />
                <FeedItem
                    title="image two"
                    url="https://i.imgur.com/3hOe84K.jpg"
                />
            </div>
            <div className={"col-3"}></div>
        </div>
    );
}
