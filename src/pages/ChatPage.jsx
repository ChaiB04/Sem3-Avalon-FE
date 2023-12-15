import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import SendMessagePlaceHolder from '../components/chatting/SendMessagePlaceholder';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import tokenService, { userData } from '../services/TokenService';
import ChatMessagesPlaceholder from '../components/chatting/ChatMessagesPlaceholder';
import {useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../components/chatting/ChatMessages.module.css';
import ChatService from "./../services/ChatService"
import ChatHolder from '../components/chatting/ChatHolder';

function ChatPage() {
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState("");
  const [Allmessages, setAllmessages] = useState([]);
  const userToken = useSelector((state) => state.token);
  // const location = useLocation();
  // const [chattingTo, setChattingTo] = useState(location.state?.chatTo || ""); 
  const [isCustomerService, setCustomerService] = useState(false);
  const [chatlog, setChatLog] = useState([]);
  const [chatId, setChatId] = useState();
  const [chatToId, setChatToId] = useState();
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    getUserName();
  }, [userToken]);


  async function getUserName() {
    
    if (userToken != null) {
      tokenService.setAccessToken(userToken);
      const email = userData.claims.sub;
      if(email === "customerservice@gmail.com"){
        setCustomerService(true);
        ChatService.getChatsCustomerService(userToken).then(response => {
          setChatLog(response.data.chats);
        })
        setCurrentId(2);
        setUsername(`Customer Service`)
        // setChattingTo()
      }
      else{
        setUsername(email);
        setChatToId(2);
        setCurrentId(userData.claims.userId);
        const id = await setChatIdCustomerUser();
        setChatId(id);
        //console.log("chatid: " + id);
        // setupStompClient(id);

        // setChattingTo("Customer Service")
      }
    } else {
      //gotta make it so the customer service can choose multiple chats maybe?
      toast.info("cannot message without account!");
    }
  }


  const setupStompClient = (id) => {
    const host = 'ws://localhost:8080/ws';
    const stompClient = new Client({
      brokerURL: host,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  
    stompClient.onConnect = () => {
      stompClient.subscribe(`/user/${id}/queue/inboxmessages`, (data) => {
        onMessageReceived(data);
      });
  
      // Set the stompClient state after the connection is established
      setStompClient(stompClient);
    };
  
    stompClient.activate();
  };
  
  const sendMessage = (newMessage) => {
    if (stompClient) {
      const payload = {
        id: uuidv4(),
        from: currentId,
        chat_id: chatId,
        to: chatToId,
        text: newMessage.text,
        date: new Date().toISOString(),
      };

  
      setAllmessages((messagesSent) => [...messagesSent, payload]);
  
      if (payload.chat_id) {
        console.log(payload.chat_id);
        stompClient.publish({
          destination: `/user/${payload.chat_id}/queue/inboxmessages`,
          body: JSON.stringify(payload),
        });
        ChatService.postMessage(payload).then((response) => {
          setChatId(response.data.chat_id);
        });
      } else {
        // Handle messages without 'to' appropriately
      }
    } else {
      console.warn("Stomp client not ready. Message not sent.");
    }
  };
  

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setAllmessages((messagesReceived) => [...messagesReceived, message]);
  };

   const [readyToChat, setReadyToChat] = useState(false);

//   function readyChat( prop )
// {
//   setReadyToChat(prop);
// }

 async function setChatIdCustomerService(props){
  setChatId(props.chatId);
  setReadyToChat(props.readyToChat);
  console.log("props for customer service: " + props.chatId)
  setupStompClient(props.chatId);
  // setupStompClient(chatToId);
  await ChatService.getChat(props.chatId, userToken).then(response => {
    setAllmessages(response.data.chat.chatMessages)
    // console.log(response)
  })
}

  async function setChatIdCustomerUser(){
    tokenService.setAccessToken(userToken);
    const userid = userData.claims.userId;
    
    const response = await ChatService.getChatOfCustomer(userid, userToken);
    setAllmessages(response.data.chat.chatMessages);
    ///console.log("props for user: " + response.data.chat.id)
    setupStompClient(response.data.chat.id);
    // console.log("response id:" + response.data.chat.id)
    setChatId(response.data.chat.id);
    return response.data.chat.id;
  }


return (
  <>
    <div>
      {isCustomerService ? (
        chatId ? (
          <div>
            <div className={styles.messageHolder}>
              <p>I am: Customer Service</p>
              <p>Chatting to: {username}</p>
              <ChatMessagesPlaceholder
                username={username}
                Allmessages={Allmessages}
              />
              <br></br>
              <SendMessagePlaceHolder
                username={username}
                onMessageSend={sendMessage}
                destinationUsername={chatId}
              />
            </div>
          </div>
        ) : (
          <>
            <h3>History</h3>
            {chatlog.length > 0 ? (
              chatlog.map((chat) => (
                <ChatHolder
                  key={chat.id}
                  chat={chat}
                  onSetChatIdCustomerService={setChatIdCustomerService}
                />
              ))
            ) : (
              <p>No chats</p>
            )}
          </>
        )
      ) : (
        <div className={styles.messageHolder}>
          <p>I am: {username}</p>
          <p>Chatting to: Customer Service</p>
          <ChatMessagesPlaceholder
            username={username}
            Allmessages={Allmessages}
          />
          <br></br>
          <SendMessagePlaceHolder
            username={username}
            onMessageSend={sendMessage}
            destinationUsername={chatId}
          />
        </div>
      )}
    </div>
    <ToastContainer />
  </>
);
;
}

export default ChatPage;