import React, { Fragment, useState, useContext } from "react";
import Button from "../../components/UI/Button/Button";
import Login from "./Login";
import Modal from "../../components/UI/Modal/Modal";
import LoggedInContext from "../../context/LoggedInContext";
import axios from "axios";
import Cookie from "js-cookie";
import SignUp from "./Signup";

export default function UserAuth() {
    const { loggedIn, toggleLoggedIn } = useContext(LoggedInContext);

    const [isModalShowing, setModalShowing] = useState(false);
    const [modalContent, setModalContent] = useState();

    const toggleModalShowing = () => {
        setModalShowing(!isModalShowing);
    };

    const logIn = () => {
        setModalContent("login");
        toggleModalShowing();
    };

    const signUp = () => {
        setModalContent("signup");
        toggleModalShowing();
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
