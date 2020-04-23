import React from "react";
import Layout from "./components/Layout/Layout";
import Feed from "./containers/Feed/Feed";
import { LoggedInContextWrapper } from "./context/LoggedInContext";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./containers/UserAuth/Login";
import SignUp from "./containers/UserAuth/Signup";
import classes from "./App.module.css";
import FileUpload from "./containers/FileUpload/FileUpload";
import { Notifications } from 'react-push-notification';
import MyImages from './containers/MyImages/MyImages'

const app = () => (
    <LoggedInContextWrapper>
        <BrowserRouter>
            <Notifications />

            <Route
                path="/"
                exact
                render={() => (
                    <Layout>
                        <Feed />
                    </Layout>
                )}
            />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" render={() => <SignUp />} />
            <Route path="/upload" render={() => <FileUpload />} />
            <Route path="/myImages" render={() => (
                <Layout>
                    <MyImages />
                </Layout>
            )} />

        </BrowserRouter>
    </LoggedInContextWrapper>
);

export default app;
