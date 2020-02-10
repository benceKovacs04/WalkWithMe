import React, { Fragment } from "react";
import Button from "../Button/Button";

const userAuth = props => {
    return (
        <Fragment>
            <Button buttonText="Log in" />
            <Button buttonText="Register" />
        </Fragment>
    );
};

export default userAuth;
