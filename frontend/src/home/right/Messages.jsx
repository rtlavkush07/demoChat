import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../components/Loading.jsx';
import useGetSocketMessage from '../../context/useGetSocketMessage.js';
import { useSocketContext } from '../../context/SocketContext.jsx'; // 1. Import Socket Context

//  Accepting the 'username' prop from the parent component Right.jsx
const Messages = ({ username }) => {
  const { messages, loading } = useGetMessage();
  useGetSocketMessage();

  //  Get the socket and add state to track the typing user
  const { socket } = useSocketContext();
  const [typingUser, setTypingUser] = useState(null);

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  // Add a useEffect to listen for typing events from the server
  useEffect(() => {
    if (!socket) return;

    // Listen for the "showTyping" event from the server
    socket.on("showTyping", ({ senderId }) => {

      // console.log(`Event received. Sender ID is: '${senderId}'`);
  // console.log(`My username prop is: '${username}'`);

  if (senderId !== username) {
    // console.log(" checcking:  Updating state to show indicator.");
    setTypingUser(senderId);
  } else {
    // console.log(" not working: Sender is the current user. Not showing indicator.");
  }
    });

    // Listen for the "hideTyping" event
    socket.on("hideTyping", ({ senderId }) => {
        // console.log(`Browser received 'hideTyping' event from ${senderId}`); 
      if (typingUser === senderId) {
        setTypingUser(null);
      }
    });

    // Clean up the listeners when the component unmounts
    return () => {
      socket.off("showTyping");
      socket.off("hideTyping");
    };
  }, [socket, username, typingUser]);

  return (
    <div className="flex-1 mb-7 overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" }}>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 && messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center text-white font-sans mt-[20%]">No Messages</p>
        </div>
      )}

     {/*  message typing indicator on the chat screen */}
      {/* {typingUser && (
      <div className="px-4 py-2 italic text-white/70">
        {typingUser} is typing...
      </div>
    )} */}
     {typingUser && (
      <div className="px-4 py-2 italic text-white/70">
        Typing...
      </div>
    )}
    </div>
  );
};

export default Messages;