import React, { useState } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./Signup.module.css";
import axios from "axios";

export default function Signup(props) {
    const [username, changeUserName] = useState();
    const [passwordOne, changePasswordOne] = useState();
    const [passwordTwo, changePasswordTwo] = useState();
    const [email, changeEmail] = useState();

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
        props.closeModal();
        if (passwordOne === passwordTwo) {
            axios
                .post("https://localhost:5001/api/userservice/signup", {
                    username: username,
                    password: passwordOne,
                    email: email
                })
                .then(resp => {
                    if (resp.status === 200) {
                        alert("Click the link in the email");
                    }
                });
        }
    };

    return (
        <div className={classes.Signup}>
            <div>
                <label for="username">Username</label>
                <input
                    required
                    type="text"
                    id="username"
                    onChange={setUsername}
                ></input>
            </div>
            <div>
                <label for="passwordOne">Password</label>
                <input
                    type="password"
                    id="passwordOne"
                    onChange={setPasswordOne}
                    required
                ></input>
            </div>
            <div>
                <label for="passwordTwo">Password again</label>
                <input
                    type="password"
                    id="passwordTwo"
                    onChange={setPasswordTwo}
                    required
                ></input>
            </div>
            <div>
                <label for="email">Email Address</label>
                <input
                    required
                    type="text"
                    id="email"
                    onChange={setEmail}
                ></input>
            </div>
            <div>
                <Button click={signUp} buttonText="Sign Up!"></Button>
            </div>
        </div>
    );
}
