import "./App.css";
import socket from "./server";
import {useEffect} from "react";
import InputField from "./components/InputField/InputField";
import React, { useState } from "react";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    console.log("message List", messageList);
    useEffect(()=> {
            socket.on("message", (message) => {
                setMessageList((prevState => prevState.concat(message)));
                // setMessage(prevState => prevState.concat(message));
            });
            askUserName();
        }, [])

    const askUserName = () => {
        const userName = prompt("당신의 이름을 입력하세요");

        socket.emit("login",  userName, (res)=> {
            if(res?.ok){
                setUser(res.data);
            }
        });
    };
    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit("sendMessage", message, (res)=>{
            console.log("sendMessage res", res);
        })
    };
  return (
    <div>
      <div className="App">
          <MessageContainer messageList={messageList} user ={user}/>
          <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default App;
