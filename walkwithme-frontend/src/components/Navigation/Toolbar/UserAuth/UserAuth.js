import React, { Fragment, useState, useContext } from "react";
import Button from "../../../UI/Button/Button";
import Login from "./Login";
import Modal from "../../../UI/Modal/Modal";
import LoggedInContext from "../../../../context/LoggedInContext";
import axios from "axios";
import Cookie from "js-cookie";

export default function UserAuth() {
    const { loggedIn, toggleLoggedIn } = useContext(LoggedInContext);

    const [isModalShowing, setModalShowing] = useState(false);

    const toggleModalShowing = () => {
        setModalShowing(!isModalShowing);
    };

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
                }
            });
    };

    return (
        <Fragment>
            <Modal show={isModalShowing} click={toggleModalShowing}>
                <Login
                    toggleLoggedIn={toggleLoggedIn}
                    closeModal={toggleModalShowing}
                />
            </Modal>
            {loggedIn ? (
                <Button click={logOut} buttonText="Log out" />
            ) : (
                <span>
                    <Button click={toggleModalShowing} buttonText="Log in" />
                    <Button buttonText="Register" />
                </span>
            )}
        </Fragment>
    );
}
