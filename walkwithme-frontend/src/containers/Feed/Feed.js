import React, { Component } from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import classes from "./Feed.module.css";

class Feed extends Component {
    render() {
        return (
            <div>
                <FeedItem
                    title="image one"
                    url="https://i.imgur.com/uQFZYcE.jpg"
                />
                <FeedItem
                    title="image two"
                    url="https://i.imgur.com/3hOe84K.jpg"
                />
            </div>
        );
    }
}

export default Feed;
