import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

export default function Modal(props) {
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.click} />
            <div
                className={classes.MyModal}
                style={{
                    transform: props.show
                        ? "translateY(0)"
                        : "translateY(-100%)",
                    opacity: props.show ? "1" : "0"
                }}
            >
                {props.children}
            </div>
        </Fragment>
    );
}
