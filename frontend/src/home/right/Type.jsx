import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

//  Accepting `username` and `receiverId` as props from parent component Right.jsx
const Type = ({ username, receiverId }) => {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");
  
  //  Geting the socket instance from its context
  const { socket } = useSocketContext();

  //  Use a ref to manage the typing timeout
  const typingTimeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessages(message);
    setMessage(""); // Clear the input box

    //  When a message is sent, immediately hide the typing indicator
    if (socket) {
      socket.emit("stopTyping", { senderId: username, receiverId });
      clearTimeout(typingTimeoutRef.current);
    }
  };

  //  Handle the logic for the typing indicator
  const handleChange = (e) => {
    setMessage(e.target.value);

  // console.log("Inside handleChange. Socket:", socket, "ReceiverID:", receiverId);
    if (socket && receiverId) {
    // console.log("--- Emitting showTyping ---");
      // Clear any previous timer
      clearTimeout(typingTimeoutRef.current);
      
      // Emit an event saying the user has started typing
      socket.emit("typing", { senderId: username, receiverId });

      // Set a new timer. If the user stops typing for 1 second,
      // an event will be sent to hide the indicator.
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", { senderId: username, receiverId });
      }, 1000); // 1-second delay
    }
  };
  
  // Cleanup the timeout when the component unmounts
  useEffect(() => {
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-1 h-[8vh] bg-gray-800">
          <div className="w-[90%] mx-4">
            <input
              type="text"
              value={message}
              onChange={handleChange} 
              className="border-[1px] border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900 mt-1"
              placeholder="Type here"
            />
          </div>
          <button disabled={loading}>
            <IoSend className="text-3xl hover:bg-gray-900" />
          </button>
        </div>
      </form>
    </>
  );
};

export default Type;