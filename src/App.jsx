import { useEffect, useMemo, useState } from "react"
import "./App.css"
import { io } from "socket.io-client";
function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [userId, setUserId] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const socket = useMemo(() => io("http://localhost:3000"), [])




  const submitChat = (e) => {
    e.preventDefault();
    const ownerMessage = { sender: "username", text: message }
    socket.emit("message", {message,room});
    setAllMessage((prev) => [...prev, ownerMessage]);
    setMessage("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id)
    })
    socket.on("Usermessage", (newmessage) => {
      setAllMessage((prev) => [...prev, newmessage]);
    })
    


    // return ()=>{
    //   socket.disconnect();
    // }

  }, [])

  return (
    <>
      <form className="chat-box" onSubmit={submitChat}>
        <div className="messages" id="messages">
          <div className='middle-chat'>
            your Id : {userId}
          </div>
          <div className='middle-chat'>
            join user
          </div>

          {
            allMessage.map((ele) => {
              return (
                <div className={ele.sender === "username" ? 'right-chat' : 'left-chat'}>
                  <h5>{ele.sender === "username" ? ele.text : ele}</h5>
                </div>
              )
            })
          }


        </div>
        <input type="text" id="message-room" value={room} onChange={(e) => { setRoom(e.target.value) }} placeholder="Type your room..." />
        <input type="text" id="message-input" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Type your message..." />
        <button type='submit' id="send-button">Send</button>
      </form>
    </>
  )
}

export default App
