import React, { useRef } from 'react'

import * as signalR from '@aspnet/signalr'
import addNotification from 'react-push-notification';


const websocketContext = React.createContext({
    connection: "",
    connect: () => { },
    closeWebsocketConnection: () => { },
    walking: () => { }
});

export const WebSocketContextWrapper = props => {

    const connection = useRef();

    const notify = (from) => {
        addNotification({
            message: `${from} has walked with you!`,
            theme: "darkblue",
            native: false,
            duration: 5000,

        })
    }

    const walking = (to) => {
        connection.current.invoke("SendWalkNotification", to)
    }

    const connect = () => {
        connection.current = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/hubs/notification").build();

        connection.current.on("ReceiveWalkNotification", (from) => {
            notify(from);
        })

        connection.current.start({ withcredentials: true }).catch(error => console.log(error));
    }

    const closeWebsocketConnection = () => {
        if (connection.current != null) {
            connection.current.stop()
        }

    }

    return (
        <websocketContext.Provider
            value={{
                connect,
                closeWebsocketConnection,
                walking
            }}
        >
            {props.children}
        </websocketContext.Provider>
    )
}

export default websocketContext
