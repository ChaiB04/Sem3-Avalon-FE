import styles from './ChatMessages.module.css';
import userService from "../../services/UserService"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import TokenService, { userData } from '../../services/TokenService';


const Message = (props) => {
  
  const userToken = useSelector((state) => state.token);

  const MessageFrom = props.from !== getTokenId();
  const [name, setName] = useState("");


  function getTokenId(){
    TokenService.setAccessToken(userToken);
    return userData.claims.userId;
  }

  useEffect(() => {
    getUsers();
  }, [name])

  function getUsers(){
    console.log(props)
    userService.getUserById(props.from)
    .then(response => {
    setName(response.email);

    })
  }
  return (
    <div className={`${styles.Message} ${MessageFrom ? styles.DirectMessage : styles.ReceivedMessage}`}>
      <b>{name}</b>: {props.text} 
    </div>
  );
};

const ChatMessagesPlaceholder = (props) => {

  
  return (
    <div className={styles.ChatMessages}>
      {props.Allmessages.map(message => (
        <Message
          key={message.id}
          from={message.from}
          to={message.to}
          username={props.username}
          text={message.text}
        />
      ))}
    </div>
  );
};


export default ChatMessagesPlaceholder;
