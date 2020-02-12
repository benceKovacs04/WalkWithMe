import React from "react";
import Layout from "./components/Layout/Layout";
import Feed from "./containers/Feed/Feed";
import { LoggedInContextWrapper } from "./context/LoggedInContext";

const app = () => (
    <LoggedInContextWrapper>
        <Layout>
            <Feed />
        </Layout>
    </LoggedInContextWrapper>
);

export default app;
