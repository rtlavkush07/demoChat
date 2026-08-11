import React, { useEffect } from 'react';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Type from './Type';
import useConversation from '../../statemanage/useConversation.js';
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  
  const [authUser] = useAuth();
  
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]); 

  const currentUserUsername = authUser?.user?.name;
  const receiverId = selectedConversation?._id;

  return (
    <div className={`w-full md:w-[65%] bg-black/30 text-white flex flex-col h-screen ${!selectedConversation ? "hidden md:flex" : "flex"}`}>
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <>
          <Chatuser />
          <div className="py-2 flex-1 overflow-y-auto">
            <Messages username={currentUserUsername} />
          </div>
          <Type username={currentUserUsername} receiverId={receiverId} />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChat = () => {
  const [authUser] = useAuth();
  const userName = authUser?.user?.name || authUser?.name || 'User';

  return (
    <div className='flex flex-1 items-center justify-center bg-black/30 h-full'>
      <div className="text-center bg-black/40 p-8 rounded-lg border border-gray-700/50 mx-4">
        <h1 className='font-semibold text-2xl text-white mb-2'>
          Welcome <span className="text-blue-500">{userName}</span>
          <br />
          Please select a chat to start messaging.
        </h1>
      </div>
    </div>
  );
};
