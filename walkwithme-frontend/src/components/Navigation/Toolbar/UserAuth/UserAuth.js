import React, { Fragment, useState, useContext } from "react";
import Button from "../../../UI/Button/Button";
import Login from "./Login";
import Modal from "../../../UI/Modal/Modal";
import LoggedInContext from "../../../../context/LoggedInContext";

export default function UserAuth() {
    const { loggedIn, toggleLoggedIn } = useContext(LoggedInContext);

    const [isModalShowing, setModalShowing] = useState(false);

    const toggleModalShowing = () => {
        setModalShowing(!isModalShowing);
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
                <Button buttonText="Log out" />
            ) : (
                <span>
                    <Button click={toggleModalShowing} buttonText="Log in" />
                    <Button buttonText="Register" />
                </span>
            )}
        </Fragment>
    );
}
