import './BankChat.css'
import image1 from './../../../../images/je.jpg'
import image2 from './../../../../images/profile.jpg'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {messageHistory} from '../../../../redux-slice/UserSlice'

const BankChat = () => {
  const dispatch = useDispatch()
  const {auth,users} = useSelector((store) =>store)
  const user = users.find(user => user.id === auth.authId)
  const [newMessage, setNewMessage] = useState({id:'', action:'received',messages:''})
  const handdleChange = (e) => {
    const {name, value} = e.target
    setNewMessage({...newMessage, [name]:value, action:'received'})
  }

  const handdleSubmit = (e) => {
    e.preventDefault()
    const action = "received"
    const userSender = users.find((res) => res.id === parseFloat(newMessage.id))
    dispatch(messageHistory({
      action,
      newMessage,
      auth:auth.authId
    }))
    dispatch(messageHistory({
      action:'send',
      newMessage,
      auth:auth.authId,
      userSender:userSender.id
    }))
    setNewMessage('')
  }

  return (
    <div className="div_body">

    {/* MESSAGES */}

      <div className="container_chat_history">
        <div className="body_chat">
          {/* <p className="message_chat"> <img src={image1} alt=""/>Hello</p> */}
        </div>
      </div> 

        {/* CHAT BOX */}

      <div className="container_chat">
        <div className="header_chat">
          <h1>Bank Chat</h1>
          {/* <button>Inbox</button> */}
        </div>
        <div className="body_chat">
          { user.chatMessageHistory.map((item, index) => (
            <div key={index}>

            {item.action === "send" ? (
              <p className="message_chat">{item.messages}<img src={image2} alt=""/></p>
            )
            :  item.action === "received" ? (
              <p className="message_chat user_message"> <img src={image1} alt=""/>{item.messages}</p>
            )
            : ''}
            </div>
          ))
          }

        </div>
        <div className="footer_chat">
          <form onSubmit={handdleSubmit}>
            <input type="number" name="id" onChange={handdleChange}  placeholder="Type account id Here..."/>
            <input type="text" name="messages" onChange={handdleChange}  placeholder="Type Message Here..."/>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>   
          
    </div>
  )
}

export default BankChat
