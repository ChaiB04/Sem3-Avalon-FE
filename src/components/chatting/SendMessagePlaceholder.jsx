import { useState } from "react";

import styles from './ChatMessages.module.css';


const SendMessagePlaceholder = (props) =>{
    const [message, setMessage] = useState('');
    const [destinationUsername, setDestinationUsername] = useState('');

    if(!props.username){
        return<></>;
    }

    const onMessageSend = () => {
        if(!message){
            alert('Please type a message!');
        }

        props.onMessageSend({ 'text': message, 'to': destinationUsername});
        setMessage('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }





    return(
        <>
        <form onSubmit={onSubmit} className={styles.form}>
            <input id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message}></input>
            <button onClick={onMessageSend}>Send</button>
        </form>
        </>
    )
}

export default SendMessagePlaceholder;