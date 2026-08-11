import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import useConversation from "../../statemanage/useConversation";

function Logout() {
    const [loading, setLoading] = useState(false);
    const [, setAuthUser] = useAuth();
    const { selectedConversation, clearConversation } = useConversation(); // Added selectedConversation for responsive toggle
    
    const handleLogOut = async () => {
        setLoading(true);
        try {
            const res = await axios.post("https://demochat-1.onrender.com/api/user/logout");
            localStorage.removeItem("user");
            Cookies.remove("jwt"); 
            setAuthUser(undefined); 
            clearConversation(); 
            setLoading(false);
            toast.success("Logout successful");
        } catch (error) {
            console.log("Error logging out:", error);
            setLoading(false);
            toast.error("Error logging out");
        }
    }
    
  return (
    <>
      <div className={`w-[15%] md:w-[5%] bg-black/40 text-white border-r border-gray-700/50 flex flex-col justify-end ${selectedConversation ? "hidden md:flex" : "flex"}`}>
        <div className="p-3 align-bottom flex justify-center mb-4">
          <button 
            onClick={handleLogOut}
            disabled={loading}
            className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600/60 hover:bg-blue-600 p-2 rounded-lg duration-300 transition-colors"
          >
            <TbLogout2 className="text-3xl text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
export default Logout;
