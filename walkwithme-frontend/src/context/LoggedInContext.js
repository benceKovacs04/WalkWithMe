import React, { useState } from "react";
import Cookie from "js-cookie";

const loggedInContext = React.createContext({
    loggedIn: "",
    toggleLoggedIn: () => {}
});

export const LoggedInContextWrapper = props => {
    let [loggedIn, setLoggedIn] = useState(
        Cookie.get("secondaryToken") ? true : false
    );

    let toggleLoggedIn = () => {
        setLoggedIn(!loggedIn);
    };

    return (
        <loggedInContext.Provider
            value={{
                loggedIn,
                toggleLoggedIn
            }}
        >
            {props.children}
        </loggedInContext.Provider>
    );
};

export default loggedInContext;
