import React from "react";
import styles from './LoginPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage(){
return(
  <>
    <form className= {styles.loginForm}>
    <label className={styles.loginTitle}>Login</label>
         <input className={styles.textBoxes} type="text" name="email"  placeholder="Email" />
   
         <input className={styles.textBoxes} type="password" name="password"  placeholder="Password" />
         <br/>
         <button type="submit" className={` ${styles.buttonLogin}`}>Login</button>
    </form>
  </>

)
}

export default LoginPage;