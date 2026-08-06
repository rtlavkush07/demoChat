// SocketIO/server.js

import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

// Allow frontend at port 5173 cors origin
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const users = {}; // Maps userId to socket.id

// Utility function for getting socket ID by user ID
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};
 
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  const userId = socket.handshake.query.userID;
  console.log('User ID:', userId);

  if (userId) {
    users[userId] = socket.id;
    console.log('Current online users:', users);
  }

  // Notify all clients about online users
  io.emit('getonline', Object.keys(users));



// Typing indicator events
socket.on("typing", ({ senderId, receiverId }) => {

  //  console.log(`Server received 'typing' event from ${senderId} for ${receiverId}`);
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("showTyping", { senderId });
  }
});

// Stop typing indicator events
socket.on("stopTyping", ({ senderId, receiverId }) => {
  //  console.log(`Server received 'stopTyping' event from ${senderId}`);
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("hideTyping", { senderId });
  }
});



//  disconnecting user
socket.on('disconnect', () => {
  console.log('Client disconnected:', socket.id);
  
  // Find the user ID associated with the disconnected socket
  let disconnectedUserId;
  for (const userId in users) {
    if (users[userId] === socket.id) {
      disconnectedUserId = userId;
      break;
    }
  }

  // If found, delete it and notify clients
  if (disconnectedUserId) {
    delete users[disconnectedUserId];
    console.log(`User ${disconnectedUserId} disconnected. Online users:`, users);
    io.emit('getonline', Object.keys(users));
  }
});

});
export { app, server, io };
