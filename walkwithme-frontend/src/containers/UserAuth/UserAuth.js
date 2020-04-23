import React, { Fragment, useState, useContext } from "react";
import Button from "../../components/UI/Button/Button";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";
import Cookie from "js-cookie";
import { Redirect } from 'react-router-dom';

export default function UserAuth() {
    const [toHome, redirectToHome] = useState(false);
    const [toUpload, redirectToUpload] = useState(false);
    const [toLogin, redirectToLogin] = useState(false);
    const [toSignUp, redirectToSignUp] = useState(false);

    const { loggedIn, toggleLoggedIn, setUsername } = useContext(LoggedInContext);

    const logOut = () => {
        axios
            .get("https://localhost:5001/api/userservice/logout", {
                withCredentials: true
            })
            .then(resp => {
                if (resp.status === 200) {
                    toggleLoggedIn();
                    setUsername("")
                    Cookie.remove("secondaryToken");
                    Cookie.remove("token");

                    if (window.location != "/") {
                        redirectToHome(true)
                    }
                }
            });
    };

    return (
        <Fragment>
            {toHome ? <Redirect to="/" /> : null}
            {toUpload ? <Redirect to="/upload" /> : null}
            {toLogin ? <Redirect to="/login" /> : null}
            {toSignUp ? <Redirect to="/signup" /> : null}
            {loggedIn ? (
                <Button
                    click={() => redirectToUpload(true)}
                    buttonText="Upload Image"
                />
            ) : null}
            {loggedIn ? (
                <Button click={logOut} buttonText="Log out" />
            ) : (
                    <span>
                        <Button
                            click={() => redirectToLogin(true)}
                            buttonText="Log in"
                        />
                        <Button
                            click={() => redirectToSignUp(true)}
                            buttonText="Sign up!"
                        />
                    </span>
                )}
        </Fragment>
    );
}
