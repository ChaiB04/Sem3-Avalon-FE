import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../user/ProfilePage.module.css"
import userService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import ProfileInfo from "../../components/ProfileInfo";
import EditProfileInfo from "../../components/EditProfileInfo";
import { useSelector } from "react-redux/es/hooks/useSelector";
import TokenService from "../../services/TokenService";
import { userData } from "../../services/TokenService";

function ProfilePage() {

    const [user, setUser] = useState({});
    const [picture, setPicture] = useState(null);
    const [editing, setEditing] = useState(false);
    const [buttonEditText, setButtonEditText] = useState();
    const userToken = useSelector((state) => state.token);

    const editPorfile = "Edit Profile";
    const goBack = "Go back";

    useEffect(() => {
        getUser()
        setButtonEditText(editPorfile);
    }, [])
  
    function enableEditing(){
      if(editing){
        setButtonEditText(editPorfile);
        
        setEditing(false);
      }
      else{
        setButtonEditText(goBack)
        setEditing(true);
      }
    }



    function getUserId(){
      TokenService.setAccessToken(userToken);
      //console.log(userData.claims)
      return userData.claims.userId;      ;
    }

    async function getUser(){
      //hardcoded right now
      const id = getUserId();
        await userService.getUserById(id).then((response) =>{
          setUser(response);
          if (response.picture) {
            setPicture("data:image/png;base64," + response.picture);
          }
        })
        .catch(error => {
          const errors = error.response.data.properties.errors
          if (error.response.data.status === 400) {
            errors.forEach((error, index) => {
              toast.error(error.error, {
                position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 5000,
              draggable: false,
              className: styles.toastNotification,
              toastId: index.toString()
              })
            })
              
            ;
          }
        })
    }


  return (
    <>
      <div className={styles.containerfluid}>
        <div className={styles.cover} style={{ background: "url('https://s-media-cache-ak0.pinimg.com/originals/84/21/d1/8421d1b53991d565a0e07d0d88cc83f2.jpg') no-repeat" }}>
          {/* <button className={styles.edit_cover_btn}  title="edit cover photo"></button> */}
          {/* "glyphicon glyphicon-edit"  */}
        </div>
        <div className={styles.loggedin_user}>
         
            <div className={styles.user_profile}>
              {picture !== null ? (
                <img src={picture} alt="user profile" />
              ) : (
                <p>There is no avatar selected.</p>
              )
              }
            </div>
            <button onClick={enableEditing} className={styles.button}>{buttonEditText}</button>

          <div  className={styles.profileInfo}>
          {editing ? (
            <EditProfileInfo props = {user}/> 
          ) : (
            
            <ProfileInfo props = {user}/> 
          )}          
          </div>
       
  
        </div>
        <div className={styles.user_details}>

        </div>
       
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "#2b1327", color: "#ECE1E7",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"  }} />
    </>
  );
}

export default ProfilePage;
