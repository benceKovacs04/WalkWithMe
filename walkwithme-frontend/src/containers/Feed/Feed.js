import React, { useState, useContext } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";

export default function Feed() {
    return (
        <div>
            <FeedItem title="image one" url="https://i.imgur.com/uQFZYcE.jpg" />
            <FeedItem title="image two" url="https://i.imgur.com/3hOe84K.jpg" />
        </div>
    );
}
