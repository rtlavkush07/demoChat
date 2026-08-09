import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [AuthUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  return (
    <AuthContext.Provider value={[AuthUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
