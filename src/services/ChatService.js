import axios from "axios";

const host = "http://localhost:8080/notifications";

function getChatsCustomerService(userToken){
    return new Promise((resolve, reject) => {
        axios.get(host, {
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
        axios.post(host, savePayload)
        .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    })
  }

  function getChat(id, userToken){
    return new Promise((resolve, reject) => {
      axios.get(`${host}/${id}`, {
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

  function getChatOfCustomer(id, userToken){
    return new Promise((resolve, reject) => {
      axios.get(`${host}/${id}`, {
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


 const ChatService = {
    getChatsCustomerService,
    postMessage,
    getChat,
    getChatOfCustomer
  }

  export default ChatService;