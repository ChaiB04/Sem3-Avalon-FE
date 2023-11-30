import styles from './ChatMessages.module.css';

const Message = (props) => {
  const isDirect = props.to === props.username;

  return (
    <div className={`${styles.Message} ${isDirect ? styles.DirectMessage : styles.ReceivedMessage}`}>
      <b>{props.from}</b>: {props.text} 
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
