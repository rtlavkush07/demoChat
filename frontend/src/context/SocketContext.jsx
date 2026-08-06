import { createContext, use, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";
import { useContext } from "react";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      // Get user ID safely from either nested or flat structure
      const userId = authUser?.user?._id || authUser?._id;

      if (userId) {
        const socket = io("http://localhost:3002/", {
          query: {
            userID: userId,
          },
        });
        setSocket(socket);
        socket.on("getonline", (users) => {
          setOnlineUsers(users);
          console.log("Socket Connected");
        });
        return () => socket.close();
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setOnlineUsers([]); // Clear online users when logged out
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
