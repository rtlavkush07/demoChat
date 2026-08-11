import React from 'react';
import img from './profile.jpg';
import { IoArrowBack } from "react-icons/io5"; // Added back icon for mobile
import useConversation from '../../statemanage/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

const Chatuser = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  console.log(selectedConversation);
  const { onlineUsers } = useSocketContext();

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline"
  }
  
  return (
   <div className="px-5 py-3 flex items-center space-x-4 bg-black/30 backdrop-blur-sm border-b border-gray-700/50 rounded-t-lg shadow-md">
    
    {/* MOBILE BACK BUTTON */}
    <div 
      className="md:hidden cursor-pointer bg-blue-600/60 p-2 rounded-lg hover:bg-blue-600 transition-colors" 
      onClick={() => setSelectedConversation(null)}
    >
        <IoArrowBack className="text-white text-xl" />
    </div>

    <div className="avatar online">
        <div className="w-12 rounded-full border-2 border-gray-600">
            <img src={img} alt="profile" />
        </div>
    </div>
    <div>
        <h1 className='text-lg font-semibold text-white'>
           {selectedConversation.name}
        </h1>  
        <span className='text-xs text-blue-400 font-medium'>
            {getOnlineUserStatus(selectedConversation._id)}
        </span>
    </div>
  </div>
  )
}

export default Chatuser;
