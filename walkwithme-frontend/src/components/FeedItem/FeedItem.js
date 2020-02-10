import React from "react";
import classes from "./FeedItem.module.css";
import Aux from "../../hoc/Auxiliary";

const feedItem = props => (
    <div className={classes.ItemContainer}>
        <h5 className={classes.FeedItemTitle}>{props.title}</h5>
        <img className={classes.FeedItem} src={props.url}></img>
        <p className={classes.FeedItemFooter}>ITEM FOOTER PLACEHOLDER</p>
    </div>
);

export default feedItem;
