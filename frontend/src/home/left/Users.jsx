import React from 'react'
import User from './User'

import userGetAllUsers from '../../context/userGetAllUsers'

function Users  ()  {
const [allUsers, loading] =  userGetAllUsers();
  const realUsers = allUsers?.allUsers || [];
  // console.log(realUsers);
  return (
  <div  className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
        >
           {/* console.log("Rendering :", user); */}
    
   {realUsers.map((user,index)=>{
    //  console.log("Rendering User:", user);
    return  <User key={ index} user={user} />
   })} 
  </div>
  )
}

export default Users

