import React from "react";

const button = props => {
    return <button onClick={props.click}>{props.buttonText}</button>;
};

export default button;
