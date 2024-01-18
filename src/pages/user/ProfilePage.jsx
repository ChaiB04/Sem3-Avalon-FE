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
import OAuthService from "../../services/OAuthService";
import buttonstyle from "../../pages/ButtonStyle.module.css";
import gmailogo from "../../images/emailogo.png"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice"; 

function ProfilePage() {

  const [user, setUser] = useState({});
  const [picture, setPicture] = useState(null);
  const [editing, setEditing] = useState(false);
  const [buttonEditText, setButtonEditText] = useState();
  const userToken = useSelector((state) => state.token);

  const editPorfile = "Edit Profile";
  const goBack = "Go back";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser()
    setButtonEditText(editPorfile);
  }, [])

  function enableEditing() {
    if (editing) {
      setButtonEditText(editPorfile);

      setEditing(false);
    }
    else {
      setButtonEditText(goBack)
      setEditing(true);
    }
  }

  async function deleteAccount(){
    const id = getUserId();
    await userService.deleteAccount(id, userToken)
    .then(
      toast.info("Successfully deleted user!")
    )
    .then(
      localStorage.removeItem('cart')
      ,dispatch(logout())
      
    )
    .then(
      navigate("/")
    )
    .catch(error => {
      const errors = error.response.data.properties.errors
      if (error.response.data.status === 400) {
        errors.forEach((error, index) => {
          toast.error(error.error, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 5000,
            draggable: false,
            className: styles.toastNotification
          })
        })

          ;
      }
    })
  }



  function getUserId() {
    TokenService.setAccessToken(userToken);
    //console.log(userData.claims)
    return userData.claims.userId;;
  }

  async function getUser() {
    //hardcoded right now
    const id = getUserId();
    await userService.getUserById(id).then((response) => {
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


  const loginOAuth2 = async () => {
    await OAuthService.linkWithOAuth2(userToken)
      .then(response => {
        const link = response.data.link;
        console.log("response: ", response)
        console.log("Redirect link:", link);
        window.location.href = link;

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
          });
        }
      })

  }



  return (
    <>
      <div className={styles.containerfluid}>
        <div className={styles.cover} style={{ background: "url('https://s-media-cache-ak0.pinimg.com/originals/84/21/d1/8421d1b53991d565a0e07d0d88cc83f2.jpg') no-repeat" }}>
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
          <button onClick={enableEditing} className={buttonstyle.button}>{buttonEditText}</button>

          <div className={styles.profileInfo}>
            {editing ? (
              <EditProfileInfo props={user} />
            ) : (

              <ProfileInfo props={user} />
            )}
          </div>

          <div className="d-flex justify-items-center">

            <button onClick={loginOAuth2} className={`me-1 ${buttonstyle.button}`}>Link Gmail <img className={styles.email} src={gmailogo}></img></button>
            <button className={`ms-1 ${buttonstyle.button}`} onClick={() => deleteAccount()}>Delete account</button>

          </div>
        </div>
        <div className={styles.user_details}>

        </div>

      </div>

    </>
  );
}

export default ProfilePage;
