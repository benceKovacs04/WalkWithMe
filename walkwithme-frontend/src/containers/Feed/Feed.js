import React, { useState, useContext } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";
import FileUpload from "../FileUpload/FileUpload";
import LoggedInContext from "../../context/LoggedInContext";

export default function Feed() {
    const { loggedIn } = useContext(LoggedInContext);

    return (
        <div className={"row"}>
            <div className={"col-3 left-col"}>
                {/* {loggedIn ? <FileUpload></FileUpload> : null} */}
                <FileUpload></FileUpload>
            </div>
            <div className={"col-6"}>
                <FeedItem
                    title="image one"
                    url="https://i.imgur.com/uQFZYcE.jpg"
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
