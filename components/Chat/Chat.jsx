import React, { useContext } from "react";
import "./chat.scss";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import {format} from "timeago.js";
import { useNotificationStore } from "../../lib/notificationStore";


export default function Chat({items}){
    const [chat, setChat] = React.useState(null);
    const {currentUser, updateUser} = useContext(AuthContext);
    const {socket} = useContext(SocketContext);
    const messageEndRef = React.useRef();
    
    const decrease = useNotificationStore((state)=>state.decrease);

    React.useEffect(()=>{
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [chat])

    async function handleOpenChat(id, receiver){
        try{
            const chats = await apiRequest.get(`/chats/${id}`);
            setChat([chats.data, receiver]);
            const seen = chats.data.seenBy.includes(currentUser.id)
            if(!seen){
                decrease();
            }
        } catch(err){   
            console.log(err);
        }
    }

    
    
    async function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const text = formData.get("text");
        
        if(!text)
            return;
        
        try{
            const message = await apiRequest.put(`/message/${chat[0].id}`,{text});
            socket.emit("sendMessage", {receiverId: chat[1].id, data: message.data});
            
            setChat(prev=>{
                    return [{...prev[0], messages: [...prev[0].messages, message.data]}, prev[1]];
            })
            
            event.target.reset();
        } catch(err){
            console.log(err);
        }
    }

    React.useEffect(()=>{
        const read = async ()=>{
            try{
                await apiRequest.put(`/chats/read/${chat[0].id}`);
            } catch(err){   
                console.log(err);
            }
        }

        if(chat && socket){
            socket.on("getMessage", (data)=>{
                if(chat[0].id===data.chatId){
                    setChat(prev=>{
                        return [{...prev[0], messages: [...prev[0].messages, data]}, prev[1]];
                    });
                    read();
                }
            })
        }
        
        return ()=>{
            socket.off("getMessage");
        }
    }, [socket, chat])


    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                {
                    items.map(item=>{
                        return <div key={item.id} className="message" onClick={()=>handleOpenChat(item.id, item.receiver)} style={{backgroundColor: item.seenBy.includes(currentUser.id)||(chat && item.id===chat[0].id)?"white":"#fecd514e"}}>
                            <img src={item.receiver.avatar || "/noavatar.png"}></img>
                            <span>{item.receiver.username}</span>
                            <p>{item.lastMessage}</p>
                        </div>
                    })
                }
            </div>
            {chat && <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src={chat[1].avatar || "/noavatar.png"}/>
                        {chat[1].username}
                    </div>
                        <span className="close" onClick={(e)=>{e.preventDefault(); setChat(()=>null)}}>X</span>
                </div>
                <div className="center">
                    {
                        chat[0].messages.map(m=>{
                            return <div className="chatMessage own" key={m.id} style={{
                                alignSelf: m.userId===currentUser.id?"flex-end":"flex-start",
                                textAlign: m.userId===currentUser.id?"right":"left"
                            }}>
                                <p>{m.text}</p>
                                <span>{format(m.createdAt)}</span>
                            </div>
                        })
                    }
                    <div ref={messageEndRef}>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div  className="bottom">
                        <textarea name="text"></textarea>
                        <button>Send</button>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}