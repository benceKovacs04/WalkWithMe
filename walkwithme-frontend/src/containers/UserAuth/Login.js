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
        <div className={classes.Login}>
            <div>
                <label for="username">Username</label>
            </div>
            <div>
                <input
                    type="text"
                    id="username"
                    onChange={userNameSetter}
                ></input>
            </div>
            <div>
                <label for="password">Password</label>
            </div>
            <input
                type="password"
                id="Password"
                onChange={passwordSetter}
            ></input>
            <div>
                <Button click={loginClick} buttonText="Log in"></Button>
            </div>
        </div>
    );
}
