import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../user/ProfilePage.module.css"
import userService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import ProfileInfo from "../../components/ProfileInfo";

function ProfilePage() {

    const [user, setUser] = useState({});
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        getUser()

    }, [])

    async function getUser(){
      //hardcoded right now
      const id = 3;
        await userService.getUserById(id).then((response) =>{
          setUser(response);
          if ( response.picture) {
            setPicture("data:image/png;base64," + response.picture);
          }
        })
        .catch(error => {
          if (error.response) {
               const errors = error.response.data.errors;
               if (errors) {
               toast.error("Could not find products.");
               }
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
            <button>Edit</button>

          <div  className={styles.profileInfo}>
          <ProfileInfo props = {user}/>
          </div>
       
  
        </div>
        <div className={styles.user_details}>

        </div>
       
      </div>
    </>
  );
}

export default ProfilePage;
