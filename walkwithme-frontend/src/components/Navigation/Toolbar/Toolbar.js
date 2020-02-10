import React from "react";
import classes from "./Toolbar.module.css";

const toolbar = props => (
    <header className={classes.Toolbar}>
        <div>LOGO</div>
        <div>Search bar</div>
        <div>Account</div>
    </header>
);

export default toolbar;
