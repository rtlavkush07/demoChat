import React, { useEffect } from 'react';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Type from './Type';
import useConversation from '../../statemanage/useConversation.js';
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  
  // Get the authenticated user's data
  const [authUser] = useAuth();
  // console.log("Inspecting authUser object in Right.jsx:", authUser);
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]); 

  //  Preparing the data to be passed as props
const currentUserUsername = authUser?.user?.name;
  const receiverId = selectedConversation?._id;

  return (
    <div className="w-full bg-slate-800 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChat />
        ) : (
          <>
            <Chatuser />
            <div className="py-2 flex-1 overflow-y-auto" style={{ maxHeight: "calc(88vh - 8vh)" }}>
              {/*  Pass the 'username' prop to Messages */}
              <Messages username={currentUserUsername} />
            </div>
            {/*  Pass 'username' and 'receiverId' props to Type */}
            <Type username={currentUserUsername} receiverId={receiverId} />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChat = () => {
  const [authUser] = useAuth();
  const userName = authUser?.user?.name || authUser?.name || 'User';

  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-center font-semibold text-xl'>
        Welcome <span>{userName}</span>
        <br />
        Please select a chat to start messaging.
      </h1>
    </div>
  );
};