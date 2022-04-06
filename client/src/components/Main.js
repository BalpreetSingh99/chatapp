import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import '../index.css';
let socket;
const ENDPOINT = "localhost:5000";


export default function App() {
    const [user,setUser]=useState();
    const [msg,setMsg]=useState("");
    let location=useLocation();
    useEffect(() => {
    socket = io(ENDPOINT);
    setUser(location.state.id);

    socket.emit('joinRoom', location.state.id);


    socket.on('message', (message) => {
      outputMessage(message);
    
      // Scroll down
      let chatMessages=document.querySelector('.main-panel');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    socket.on('roomUsers', ( users ) => {
      outputUsers(users);
    });

  },[]);
  let msgUpdate=function(e){
    setMsg(document.querySelector('.input-bar').value)

  }
  let sendMsg=function(){
    socket.emit("sendMsg", {msg:msg,user:user});
  }

  

  let outputMessage=function(message){
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.user;
    p.innerHTML += `<span>${new Date().toLocaleTimeString()}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.msg;
    div.appendChild(para);
    document.querySelector('.main-panel').appendChild(div);
  }


  function outputUsers(users) {
    let userList=document.querySelector('.user-list')
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.user;
      userList.appendChild(li);
    });
  }

    return (
        <div>
        <h1>hi {user}</h1>
        <div className="main-box">
          <div className="side-panel">
            Welcome to room
            <div className="user-list">
             <li>All users</li>
            </div>
            <div className="msg-input">
            <input type="text" className="input-bar" value={msg} onChange={(e)=>{msgUpdate(e)}}></input>
            <button onClick={sendMsg}>Send</button>
            </div>
          </div>
          <div className="main-panel">
            Enter your messages
            
          </div>
        </div>
      </div>
    );
  }
  