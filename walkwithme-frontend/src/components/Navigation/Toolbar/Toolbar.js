import React, { useContext } from "react";
import classes from "./Toolbar.module.css";
import UserAuth from "../../../containers/UserAuth/UserAuth";
import LoggedInContext from '../../../context/LoggedInContext'

export default function Toolbar() {
    const { loggedIn } = useContext(LoggedInContext);

    return (
        <header className={classes.Toolbar}>
            <div className={classes.logo}>
                Walk<span>With</span>Me
        </div>
            <div>
                {loggedIn ? <button onClick={() => window.location = "/myImages"}>My images</button> : null}
                <UserAuth />
            </div>
        </header>)
}

