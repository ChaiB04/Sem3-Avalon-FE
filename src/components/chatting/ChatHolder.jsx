import React, { useEffect, useState } from "react";
import styles from "./../../pages/order/CartPage.module.css"
import chatStyle from "./ChatHolder.module.css"
import userService from "../../services/UserService"
import TokenService, { userData } from "../../services/TokenService";
import { useSelector } from "react-redux/es/hooks/useSelector";

function ChatHolder({ chat, onSetChatIdCustomerService }) {
  const [messages, setMessages] = useState([]);
  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});
  const userToken = useSelector((state) => state.token);
   

  useEffect(() => {
      setMessages(chat.chatMessages)
      getUsers()
  }, [chat])

  function getUsers(){
    userService.getUserById(chat.user_1)
    .then(response => {
      // console.log("User1   " + response)
      setUser1(response)
    })
  

    userService.getUserById(chat.user_2)
    .then(response => {
      // console.log("User2   " + response)
      setUser2(response)
    })

    // console.log(user1 + " and " + user2)
  }

  function getChatTo(){
    TokenService.setAccessToken(userToken);
    if(user1.id === userData.claims.user_id){
      return user2.email;
    }
    else{
      return user1.email;
    }
  }

  const chatId = chat.id;
  const lastMessage = messages.length > 0 ? messages[messages.length -1] : null;

  return (
    <>
      <div className ={ chatStyle.container}>
        {/* {console.log(chat)} */}
      <div className={styles.line}></div>
        <p  onClick={() => onSetChatIdCustomerService({ "chatId": chatId, "readyToChat": true})}>{getChatTo()}:   {lastMessage ? lastMessage.text : "No messages"}</p>
        <div className={styles.line}></div>
      </div>
    </>
  );
}

export default ChatHolder;
