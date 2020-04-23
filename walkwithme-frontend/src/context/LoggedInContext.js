import React, { useState } from "react";
import Cookie from "js-cookie";

const loggedInContext = React.createContext({
    loggedIn: "",
    username: "",
    toggleLoggedIn: () => { },
    setUsername: () => { }
});

export const LoggedInContextWrapper = props => {
    let [loggedIn, setLoggedIn] = useState(
        Cookie.get("secondaryToken") ? true : false
    );

    let [username, setUser] = useState("");

    let setUsername = (user) => {
        setUser(user)
    }

    let toggleLoggedIn = () => {
        setLoggedIn(!loggedIn);
    };

    return (
        <loggedInContext.Provider
            value={{
                loggedIn,
                username,
                setUsername,
                toggleLoggedIn
            }}
        >
            {props.children}
        </loggedInContext.Provider>
    );
};

export default loggedInContext;
