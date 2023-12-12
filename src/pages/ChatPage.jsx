import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import SendMessagePlaceHolder from '../components/chatting/SendMessagePlaceholder';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import tokenService, { userData } from '../services/TokenService';
import ChatMessagesPlaceholder from '../components/chatting/ChatMessagesPlaceholder';
import { useNavigate, useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../components/chatting/ChatMessages.module.css';
import ChatService from "./../services/ChatService"
import ChatHolder from '../components/chatting/ChatHolder';

function ChatPage() {
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState("");
  const [Allmessages, setAllmessages] = useState([]);
  const userToken = useSelector((state) => state.token);
  const location = useLocation();
  const [chattingTo, setChattingTo] = useState(location.state?.chatTo || ""); 
  const [isCustomerService, setCustomerService] = useState(false);
  const [chatHistory, setHistory] = useState();
  const [chatlog, setChatLog] = useState([]);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    getUserName();
  }, [userToken]);


  function getUserName() {
    if (userToken != null) {
      tokenService.setAccessToken(userToken);
      const email = userData.claims.sub;
      if(email === "customerservice@gmail.com"){
        setCustomerService(true);
        ChatService.getChatsCustomerService(userToken).then(response => {
          setChatLog(response.data.chats);
          console.log(chatlog);
        })
      }
      else{
        setUsername(email);
        setChattingTo(2);
        setupStompClient(email);
      }
    } else {
      //gotta make it so the customer service can choose multiple chats maybe?
      setUsername("love@gmail.com")
    }
  }
  
  function getUserId() {
    if (userToken != null) {
      tokenService.setAccessToken(userToken);
      if (userData.claims.userId !== 2) {
        return userData.claims.userId; // Return the user's ID if it's not 2
      }
    } else {
      // If there's no userToken, assume customer service and return 1
      toast.info("cannot message without account!");
    }
  }



  const setupStompClient = (email) => {
    const host = 'ws://localhost:8080/ws';
    const stompClient = new Client({
      brokerURL: host,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      // stompClient.subscribe('/topic/publicmessages', (data) => {
      //   console.log(data);
      //   onMessageReceived(data);
      // });
      stompClient.subscribe(`/user/${email}/queue/inboxmessages`, (data) => {
        onMessageReceived(data);
      });
    };

    stompClient.activate();

    setStompClient(stompClient);
  };

  const sendMessage = (newMessage) => {
    const payload = {
      id: uuidv4(),
      from: username,
      chat_id: chatId,
      to: chattingTo,
      text: newMessage.text,
      date: new Date().toISOString()
    };

    const savePayload ={
      id: uuidv4(),
      from: getUserId(),
      chat_id: chatId,
      to: chattingTo,
      text: newMessage.text,
      date: new Date().toISOString()
    }

    setAllmessages((messagesSent) => [...messagesSent, payload]);

    if (payload.to) {
      
      stompClient.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
      ChatService.postMessage(savePayload).then(response =>{
        setChatId(response.data.chat_id);
      })
    } 
    else {
      stompClient.publish({
        destination: `/topic/publicmessages`,
        body: JSON.stringify(payload),
      });
      ChatService.postMessage(savePayload).then(response =>{
        setChatId(response.data.chat_id);
      })
    }
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setAllmessages((messagesReceived) => [...messagesReceived, message]);
  };

  const [readyToChat, setReadyToChat] = useState(false);

  return (
    <>
    <div>
      {isCustomerService ? (
        <>
        {chatlog.length > 0 ? (
        chatlog.map((chat) => (
          <ChatHolder key={chat.id} chat={chat} />
        ))
      ) : (
        <p>No chats</p>
      )}
        </>
      ) : (
        <>
        <div className={styles.messageHolder}>
        <p>I am: {username}</p>
          <p>Chatting to: {chattingTo}</p>
          <ChatMessagesPlaceholder
            username={username}
            Allmessages={Allmessages}
          />
          <br></br>
        <SendMessagePlaceHolder
          username={username}
          onMessageSend={sendMessage}
          destinationUsername={chattingTo}
        />
      </div>
        </>
      )}
      
    </div>

      
      <ToastContainer/>
    </>
  );
}

export default ChatPage;