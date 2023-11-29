import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import SendMessagePlaceHolder from '../components/chatting/SendMessagePlaceholder'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import tokenService, { userData } from '../services/TokenService'
import ChatMessagesPlaceholder from '../components/chatting/ChatMessagesPlaceholder';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function ChatPage(){
    const [stompClient, setStompClient] = useState();
    const [username, setUsername] = useState("");
    const [messagesReceived, setMessagesReceived] = useState([]);
    const userToken = useSelector((state) => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        getUserName()
        //console.log("Products: " + productList)
      },[userToken]);


    function getUserName(){
        if(userToken != null){
            tokenService.setAccessToken(userToken);
            const email = userData.claims.sub;
            setUsername(email);
            setupStompClient(username);
        }
        else{
            navigate("/");
            toast.error("Please log in before chatting");
        }
    }


    const setupStompClient = (username) => {
        const host = 'ws://localhost:8080/ws';
        const stompClient = new Client({
            brokerURL: host,
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
          });

        stompClient.onConnect = () => {
            stompClient.subscribe('/topic/publicmessages', (data) => {
                console.log(data);
                onMessageReceived(data);
            })


            stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) =>{
                onMessageReceived(data);
            })
        }

        stompClient.activate();

        setStompClient(stompClient);
    }

    const sendMessage = (newMessage) =>{
        const payload = {'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text};

        if(payload.to){
            stompClient.publish({'destination': `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload)});

        }
        else{
            stompClient.publish({'destination': `/topic/publicmessages`, body: JSON.stringify(payload)});
        }
    }

    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        setMessagesReceived(messagesReceived => [...messagesReceived, message])
    }

    const onUsernameInformed = (username => {
        setUsername(username);
        setupStompClient(username);
    })

    return(
        <>
        <div>
            <SendMessagePlaceHolder username={username} onMessageSend={sendMessage}/>
            <br></br>
            <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
        </div>
        </>
    )
}

export default ChatPage;