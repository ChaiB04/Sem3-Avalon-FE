import React, { useEffect, useState } from "react";

function ChatHolder({ chat }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      setMessages(chat.chatMessages)
  }, [chat])


  const chatId = chat.id;
  const lastMessage = messages.length > 0 ? messages[0] : null;

  return (
    <>
      <div>
        <p>aaaaaaaaaaaaaaaaaaaa</p>
        {console.log("Chat info: " + chat)}
        {console.log(lastMessage +  " from: " + chat.user1 + " to: " + chat.user2)}
        <p>{lastMessage ? lastMessage.text : "No messages"} {chatId}</p>
        <p>aaaaaaaaaaaaaaaaaaaa</p>
      </div>
    </>
  );
}

export default ChatHolder;
