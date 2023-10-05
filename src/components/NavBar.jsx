import React from "react"
import styles from './NavBar.module.css'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {

    const links=[
        {
            id: 1,
            path: "/login",
            text: "loginpage"
        },
        {
            id: 2,
            path: "/",
            text: "Homepage"
        },
        {
            id: 3,
            path: "/register",
            text: "Registerpage"
        }
    ]

    return (
    <nav className={styles.navBar}>
        <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Menu</button>
        <div className={styles.dropdownContent}>
            {links.map(link => {
                    return (
                        <li className={styles.navItem} key={link.id}>
                            <NavLink to={link.path} className={styles.navLink}>{link.text}</NavLink>
                        </li>
                    )
                })}
        </div>
        </div>
    </nav>

    )
}

export default NavBar;