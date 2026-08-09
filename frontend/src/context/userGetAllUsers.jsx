import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios, { all } from 'axios';
function userGetAllUsers() {
  const [allUsers,setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
const getUsers = async()=>{
  setLoading(true);
 try {
       // const token = Cookies.get('jwt');
    const user = JSON.parse(localStorage.getItem("user"));

       const response = await axios.get('https://demochat-1.onrender.com/api/user/getUserProfile', {
        Credentials: 'include',
        
         headers: {
           Authorization: `Bearer ${user.token}`
         }
       });
       console.log("all users fetced", response.data)
       setAllUsers(response.data);
       setLoading(false);
    } catch (error) {
      console.log("Error in get  all users: ",error);
    }
};
   
getUsers();
  },[]); // [] so that refresh only once
 

  // return [allUsers, loading];
  return [allUsers, loading];
}

export default userGetAllUsers
