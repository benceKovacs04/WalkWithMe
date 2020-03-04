import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import axios from "axios";
import loggedInContext from "../../context/LoggedInContext";

export default function Login(props) {
    const [username, changeUsername] = useState(null);
    const [password, changePassword] = useState(null);
    const [loading, changeLoading] = useState(null);

    const { toggleLoggedIn } = useContext(loggedInContext);

    const loginClick = () => {
        changeLoading("Please wait");
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
                toggleLoggedIn();
                window.location = "/";
            })
            .catch(error => {
                if (error.response.status === 401) {
                    changeLoading("Invalid username or password");
                }
            });
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
                    <input
                        type="text"
                        placeholder="username"
                        name="user"
                        onChange={userNameSetter}
                    />
                    <br></br>
                    <input
                        onChange={passwordSetter}
                        type="password"
                        placeholder="password"
                        name="password"
                    />
                    <br></br>
                    <input onClick={loginClick} type="button" value="Login" />
                    <button onClick={() => (window.location = "/")}>
                        Home
                    </button>
                    <h3>{loading}</h3>
                </div>
            </div>
        </div>
    );
}
