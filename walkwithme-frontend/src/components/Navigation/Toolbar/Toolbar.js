import React from "react";
import classes from "./Toolbar.module.css";
import UserAuth from "../../../containers/UserAuth/UserAuth";

const toolbar = props => (
    <header className={classes.Toolbar}>
        <div>LOGO</div>
        <div>Search bar</div>
        <div>
            <UserAuth />
        </div>
    </header>
);

export default toolbar;
