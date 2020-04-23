import React, { useContext, useState } from "react";
import classes from "./Toolbar.module.css";
import UserAuth from "../../../containers/UserAuth/UserAuth";
import LoggedInContext from '../../../context/LoggedInContext'
import { Redirect } from 'react-router-dom'

export default function Toolbar() {
    const [toImages, redirectToImages] = useState(false)
    const [toHome, redirectToHome] = useState(false)

    const { loggedIn, username } = useContext(LoggedInContext);

    let location = window.location.toString();
    location = location[location.length - 1]

    return (
        <header className={classes.Toolbar}>
            {toImages ? <Redirect to="/myImages" /> : null}
            {toHome ? <Redirect to="/" /> : null}
            <div className={classes.logo}>
                Walk<span>With</span>Me
                {loggedIn ? <div className={classes.User}>
                    <p>Welcome, <span>{username}</span>! </p>
                </div> : null}
            </div>

            <div>
                {loggedIn ?
                    location == "/" ? <button onClick={() => redirectToImages(true)}>My images</button> : <button onClick={() => redirectToHome(true)}>Home</button>
                    : null}
                <UserAuth />
            </div>
        </header>)
}

