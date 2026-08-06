import React from 'react'
import { useSocketContext } from './SocketContext.jsx';
import useConversation from '../statemanage/useConversation.js';
import { useEffect } from 'react';


import sound from "../assets/notification.mp3";

const useGetSocketMessage = () =>   {

    const {socket} = useSocketContext();
    const {messages,setMessages} = useConversation();

    useEffect(()=>{
        if (socket) {
            socket.on("newMessage", (newMessage)=>{
                const notify = new Audio(sound);
                notify.play();
                setMessages([...messages, newMessage]);
            });

            return () => {
                socket.off("newMessage");
            };
        }
    },[ socket, messages,setMessages]);

  
}

export default useGetSocketMessage;