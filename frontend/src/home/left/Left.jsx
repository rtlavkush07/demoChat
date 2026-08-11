import React from 'react';
import Search from './Search';
import User from './Users'; // Keeping your import as User from Users
import useConversation from '../../statemanage/useConversation.js'; // Added for responsive toggle

function Left () {
  const { selectedConversation } = useConversation();

  return (
    <div className={`w-[85%] md:w-[30%] bg-black/30 text-white border-r border-gray-700/50 flex flex-col h-full ${selectedConversation ? "hidden md:flex" : "flex"}`}>
      <h1 className='font-bold text-2xl p-4 border-b border-gray-700/50'>Chats</h1>
      <Search/>  
      <User/>
    </div>
  )
}

export default Left;
