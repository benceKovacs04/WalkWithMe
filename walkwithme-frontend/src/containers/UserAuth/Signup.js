import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import axios from "axios";

export default function Signup(props) {
    const [username, changeUserName] = useState();
    const [passwordOne, changePasswordOne] = useState();
    const [passwordTwo, changePasswordTwo] = useState();
    const [email, changeEmail] = useState();
    const [loading, changeLoading] = useState(null);

    const setUsername = e => {
        changeUserName(e.target.value);
    };

    const setPasswordOne = e => {
        changePasswordOne(e.target.value);
    };

    const setPasswordTwo = e => {
        changePasswordTwo(e.target.value);
    };

    const setEmail = e => {
        changeEmail(e.target.value);
    };

    const signUp = () => {
        if (passwordOne === passwordTwo) {
            changeLoading("Please wait");
            axios
                .post("https://localhost:5001/api/userservice/signup", {
                    username: username,
                    password: passwordOne,
                    email: email
                })
                .then(resp => {
                    if (resp.status === 200) {
                        changeLoading(
                            "Registration successful! Please click the activation link in the e-mail we sent you!"
                        );
                    }
                })
                .catch(error => {
                    changeLoading("Username already taken");
                });
        } else {
            changeLoading("Passwords don't match");
        }
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
                        onChange={setUsername}
                    />
                    <br></br>
                    <input
                        type="text"
                        placeholder="e-mail address"
                        name="user"
                        onChange={setEmail}
                    />
                    <br></br>
                    <input
                        onChange={setPasswordOne}
                        type="password"
                        placeholder="password"
                        name="password"
                    />
                    <br></br>
                    <input
                        onChange={setPasswordTwo}
                        type="password"
                        placeholder="password again"
                        name="passwordTwo"
                    />
                    <br></br>
                    <input onClick={signUp} type="button" value="Sign up!" />
                    <button onClick={() => (window.location = "/")}>
                        Home
                    </button>
                    <h3>{loading}</h3>
                </div>
            </div>
        </div>
    );
}
