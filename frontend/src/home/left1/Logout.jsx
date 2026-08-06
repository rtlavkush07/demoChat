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
    const { clearConversation } = useConversation();
    
    const handleLogOut = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/user/logout");
            localStorage.removeItem("user");
            Cookies.remove("jwt"); 
            setAuthUser(undefined); // Update auth context to trigger re-render
            clearConversation(); // Clear conversation state
            setLoading(false);
            toast.success("Logout successful");
            
            // No need for window.location.href - React Router will handle the redirect
        } catch (error) {
            console.log("Error logging out:", error);
            setLoading(false);
            toast.error("Error logging out");
        }
    }
  return (
    <>
      <div className="w-[4%]   bg-slate-950 text-white  flex flex-col justify-end ">
        <div className="p-3  align-bottom ">
          <button 
            onClick={handleLogOut}
            disabled={loading}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TbLogout2
              className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
            />
          </button>
        </div>
      </div>
    </>
  );
}
export default Logout;