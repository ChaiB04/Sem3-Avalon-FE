import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import SendMessagePlaceHolder from '../components/chatting/SendMessagePlaceholder';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import tokenService, { userData } from '../services/TokenService';
import ChatMessagesPlaceholder from '../components/chatting/ChatMessagesPlaceholder';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import styles from '../components/chatting/ChatMessages.module.css';


function ChatPage() {
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState("");
  const [Allmessages, setAllmessages] = useState([]);
  const userToken = useSelector((state) => state.token);
  const navigate = useNavigate();
  const location = useLocation();
  const [chattingTo, setChattingTo] = useState(location.state?.chatTo || ""); 
  useEffect(() => {
    getUserName()

  }, [userToken]);

  function getUserName() {
    if (userToken != null) {
      tokenService.setAccessToken(userToken);
      const email = userData.claims.sub;
      setUsername(email);
      setupStompClient(email);
    } else {
      //gotta make it so the customer service can choose multiple chats maybe?
      setUsername("love@gmail.com")
    }
  }

  const setupStompClient = (email) => {
    const host = 'ws://localhost:8080/ws';
    const stompClient = new Client({
      brokerURL: host,
    //   debug: (str) => {
    //     console.log(str);
    //   },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    if(email === chattingTo){
        setChattingTo("love@gmail.com")
    }

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

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
      to: chattingTo,
      text: newMessage.text,
    };

    setAllmessages((messagesSent) => [...messagesSent, payload]);

    if (payload.to) {
      stompClient.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
    } else {
      stompClient.publish({
        destination: `/topic/publicmessages`,
        body: JSON.stringify(payload),
      });
    }
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setAllmessages((messagesReceived) => [...messagesReceived, message]);
  };

  return (
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
  );
}

export default ChatPage;