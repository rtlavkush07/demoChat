import React, { useState } from 'react'
import useConversation from '../statemanage/useConversation.js';
import axios from 'axios';

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessages = async (message) => {
        setLoading(true);
       
            try {
                console.log("Selected Conversation ID:", selectedConversation?._id);
                console.log("Sending message:", message);

                const res = await axios.post(
                    `/api/message/send/${selectedConversation._id}`,
                    { message }
                );

                console.log("Message sent successfully:", res.data);
                setMessages([...messages, res.data]);
                setLoading(false);
            } catch (error) {
                console.log("Error in useSendMessage: ", error);
                console.log("Error response:", error.response?.data);
                setLoading(false);
            }

        


    };
    // sendMessages();  // if this will call then infinite call will happen bcz on every render it will call this function

    return { loading, sendMessages }
    
}

export default useSendMessage;