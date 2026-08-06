import React, { createContext, useContext,useState } from 'react'
 import Cookies from 'js-cookie';


export const AuthContext = createContext();
export  const AuthProvider = ({children}) => {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("user");
    const [AuthUser, setAuthUser] = useState(() => {
        if (initialUserState) {
            try {
                return JSON.parse(initialUserState);
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                return undefined;
            }
        }
        return undefined;
    });
  return (
    <AuthContext.Provider value={[AuthUser, setAuthUser]}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);