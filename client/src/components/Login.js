import { useState } from "react";
import {
    Link
  } from "react-router-dom";

export default function Login() {
    let [id, setId] = useState("");
    let onClicks=function(){
        setId(document.querySelector('#id').value)
        
    }
    return (
      <div>
        <h1>Username</h1>
          <input type="text" id="id" onChange={onClicks}></input>
          
          <button><Link to="/main" state={{id:id}} >Submit</Link></button>
          
          
      </div>
    );
  }
  