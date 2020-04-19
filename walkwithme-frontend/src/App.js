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

const app = () => (
    <BrowserRouter>
        <Notifications />
        <LoggedInContextWrapper>
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
        </LoggedInContextWrapper>
    </BrowserRouter>
);

export default app;
