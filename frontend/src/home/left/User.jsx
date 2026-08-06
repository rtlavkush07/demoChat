import React from 'react'
import img from './profile.jpg'
import useConversation from '../../statemanage/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

 function User({user}) {
    const {selectedConversation,setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id); 
    return (

       <div className={`hover:bg-slate-600 duration-300 cursor-pointer  ${isSelected ? 'bg-slate-700'  : ''}`} 
       onClick={() => setSelectedConversation(user)}
        >
         <div className='flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer'>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    {/* user profile image  */}
                    <img src={img} />
                    {/* for online status green dot */}
                    {isOnline && (
    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
  )}
                </div> 
            </div>
            <div>
                <h1 className='font-bold'>{user.name}</h1>
                <span>{user.email}</span>
            </div>
        </div>
       </div>
    )
}

export default User