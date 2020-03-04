import React from "react";
import Layout from "./components/Layout/Layout";
import Feed from "./containers/Feed/Feed";
import { LoggedInContextWrapper } from "./context/LoggedInContext";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./containers/UserAuth/Login";
import SignUp from "./containers/UserAuth/Signup";

const app = () => (
    <BrowserRouter>
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
        </LoggedInContextWrapper>
    </BrowserRouter>
);

export default app;
