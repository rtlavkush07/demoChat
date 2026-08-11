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
    <div className={`w-full md:w-[65%] bg-black/30 text-white flex flex-col h-full ${!selectedConversation ? "hidden md:flex" : "flex"}`}>
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <>
          {/* 1. HEADER: flex-none ensures it NEVER shrinks or gets pushed up */}
          <div className="flex-none">
            <Chatuser />
          </div>
          
          {/* 2. MESSAGES: flex-1 takes space, min-h-0 forces it to scroll internally instead of expanding the screen */}
          <div className="flex-1 overflow-y-auto min-h-0 p-2">
            <Messages username={currentUserUsername} />
          </div>
          
          {/* 3. INPUT BOX: flex-none ensures it stays strictly at the bottom */}
          <div className="flex-none">
            <Type username={currentUserUsername} receiverId={receiverId} />
          </div>
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
      <div className="text-center bg-black/40 p-8 rounded-lg border border-gray-700/50 shadow-xl mx-4">
        <h1 className='font-semibold text-2xl text-white mb-2'>
          Welcome, <span className="text-blue-500">{userName}</span>!
        </h1>
        <p className="text-gray-300">
          Select a chat from the sidebar to start messaging.
        </p>
      </div>
    </div>
  );
};
