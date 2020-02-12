import React, { Fragment, useState } from "react";
import Button from "../../../UI/Button/Button";
import Login from "./Login";
import Modal from "../../../UI/Modal/Modal";

export default function UserAuth() {
    const [isModalShowing, setModalShowing] = useState(false);

    const toggleModalShowing = () => {
        setModalShowing(!isModalShowing);
    };

    return (
        <Fragment>
            <Modal show={isModalShowing} click={toggleModalShowing}>
                <Login closeModal={toggleModalShowing} />
            </Modal>
            <Button click={toggleModalShowing} buttonText="Log in" />
            <Button buttonText="Register" />
        </Fragment>
    );
}
