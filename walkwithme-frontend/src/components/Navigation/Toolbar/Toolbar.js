import React, { useContext } from "react";
import classes from "./Toolbar.module.css";
import UserAuth from "../../../containers/UserAuth/UserAuth";
import LoggedInContext from '../../../context/LoggedInContext'

export default function Toolbar() {
    const { loggedIn, username } = useContext(LoggedInContext);

    let location = window.location.toString();
    location = location[location.length - 1]

    return (
        <header className={classes.Toolbar}>
            <div className={classes.logo}>
                Walk<span>With</span>Me
            </div>
            <p>{username}asd</p>
            <div>
                {loggedIn ?
                    location == "/" ? <button onClick={() => window.location = "/myImages"}>My images</button> : <button onClick={() => window.location = "/"}>Home</button>
                    : null}
                <UserAuth />
            </div>
        </header>)
}

