import axios from "axios";

function getChatsCustomerService(userToken){
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8080/notifications", {
            headers: { Authorization: `Bearer ${userToken}` }
          })
          .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
    })
  }

  function postMessage(savePayload){
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/notifications", savePayload)
        .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    })
  }


 const ChatService = {
    getChatsCustomerService,
    postMessage
  }

  export default ChatService;