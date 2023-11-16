import React, { useEffect, useState } from "react";
import styles from '../components/ProfileInfo.module.css'
function ProfileInfo({ props }) {
    const [user, setUser] = useState();

    useEffect(() => {
        setUser(props);
    }, [props]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.divsOnRow}>
                    <div className={styles.infoColumn}>
                        <p>Firstname: </p>
                        <p>Lastname: </p>
                        <p>Email: </p>
                        <p>Phonenumber: </p> 
                        <p>Street: </p>
                        <p>Housenumber: </p>
                        <p>City: </p>
                    </div>
                
                    <div className={styles.infoProfile}>
                        <p>{user && user.firstname}</p>
                        <p>{user && user.lastname}</p>
                        <p>{user && user.email}</p>
                        <p>{user && user.phonenumber}</p>
                        <p>{user && user.street}</p>
                        <p>{user && user.housenumber}</p>
                        <p>{user && user.city}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;
