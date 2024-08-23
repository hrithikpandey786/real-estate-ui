import React,{useContext} from "react"
import {io} from "socket.io-client";
import {AuthContext} from "../context/AuthContext";

export const SocketContext = React.createContext();

export const SocketContextProvider = ({children})=>{
    const [socket, setSocket] = React.useState(null);
    const {currentUser, updateUser} = useContext(AuthContext);

    React.useEffect(()=>{
        setSocket(io("http://localhost:4000",{
            reconnection: false
        }));
    }, [])

    React.useEffect(()=>{
        currentUser && socket && socket.emit("newUser", currentUser.id);
    }, [currentUser, socket])
    
    return (<SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
    )
}
