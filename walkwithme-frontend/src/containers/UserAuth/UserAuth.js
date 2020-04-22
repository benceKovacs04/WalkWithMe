import React, { Fragment, useState, useContext } from "react";
import Button from "../../components/UI/Button/Button";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";
import Cookie from "js-cookie";

export default function UserAuth() {
    const { loggedIn, toggleLoggedIn } = useContext(LoggedInContext);

    const logOut = () => {
        axios
            .get("https://localhost:5001/api/userservice/logout", {
                withCredentials: true
            })
            .then(resp => {
                if (resp.status === 200) {
                    toggleLoggedIn();
                    Cookie.remove("secondaryToken");
                    Cookie.remove("token");

                    if (window.location != "/") {
                        window.location = "/"
                    }
                }
            });
    };

    return (
        <Fragment>
            {loggedIn ? (
                <Button
                    click={() => (window.location = "/upload")}
                    buttonText="Upload Image"
                />
            ) : null}
            {loggedIn ? (
                <Button click={logOut} buttonText="Log out" />
            ) : (
                    <span>
                        <Button
                            click={() => (window.location = "/login")}
                            buttonText="Log in"
                        />
                        <Button
                            click={() => (window.location = "/signup")}
                            buttonText="Sign up!"
                        />
                    </span>
                )}
        </Fragment>
    );
}
