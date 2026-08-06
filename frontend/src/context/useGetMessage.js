import React, { useEffect, useState } from 'react'
import useConversation from '../statemanage/useConversation.js';
import axios from "axios";
const useGetMessage = () => {

    const [loading, setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();

// console.log(selectedConversation?._id) // shuru me null tha to ._id error aa rha tha 
    useEffect(()=>{
        const getMessages = async () => {
          if(selectedConversation && selectedConversation._id) // phle select then show selected id nhi to null ka kya id hoga error aayega 
          {
          setLoading(true);
            try {
                // console.log("Selected Conversation ID:", selectedConversation?._id);

           const res = await axios.get(
             `/api/message/get/${selectedConversation._id}`
          );

            setMessages(res.data);
        } catch (error) {
            console.log("Error in useGetMessage: ", error);
            setMessages([]);
        }
        finally{
            setLoading(false);
        }

        }
        else{
            setMessages([]); // Clear messages when no conversation is selected
        }
        

        
        };
        getMessages();

       
    },[selectedConversation,setMessages]);

  return {
    messages,
    loading
  };
}

export default useGetMessage;