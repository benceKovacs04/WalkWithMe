import React, { Fragment, useState } from "react";
import classes from "./Login.module.css";
import Button from "../../components/UI/Button/Button";
import axios from "axios";

export default function Login(props) {
    const [username, changeUsername] = useState(null);
    const [password, changePassword] = useState(null);

    const loginClick = () => {
        axios
            .post(
                "https://localhost:5001/api/userservice/login",
                {
                    username: username,
                    password: password
                },
                { withCredentials: true }
            )
            .then(resp => {
                if (resp.status === 200) {
                    props.toggleLoggedIn();
                }
            })
            .then(props.closeModal());
        // props.login();
    };

    const userNameSetter = e => {
        changeUsername(e.target.value);
    };

    const passwordSetter = e => {
        changePassword(e.target.value);
    };

    return (
        <div className={classes.bodyBackground}>
            <div className={classes.grad}>
                <div className={classes.header}>
                    <div>
                        Walk<span>With</span>Me
                    </div>
                </div>
                <br></br>
                <div className={classes.login}>
                    <input type="text" placeholder="username" name="user" />
                    <br></br>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                    />
                    <br></br>
                    <input type="button" value="Login" />
                </div>
            </div>
        </div>
    );
}
