const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {userJoin,userLeave,getUsers} = require('./utils');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

app.use(cors({
    origin:"*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));


app.get("/",(req,res)=>{
    res.send("hi");
})


io.on('connection', (socket) => {
    console.log("we have a new connection")
    socket.on('sendMsg', (details) => {
        io.emit('message', details);
    })
    
    socket.on('joinRoom', ( user ) => {
        const userReturned = userJoin(socket.id, user);
    
        
    
        // Welcome current user
        socket.emit('message',{user:'bot',msg:'Welcome to chatapp'});
    
        // Broadcast when a user connects

        socket.broadcast.emit('message',{user:'bot',msg:`${userReturned.user} has joined the chat`});

        io.emit('roomUsers', getUsers());
    
        
    });

    socket.on('disconnect', () => {
        const userReturned = userLeave(socket.id);
    
        if (userReturned) {
          io.emit(
            'message',{user:'bot',msg:`${userReturned.user} has left the chat`}
          );
        }

        io.emit('roomUsers',getUsers());
    });



});


server.listen(5000,()=>{console.log("listening on 5000")})


