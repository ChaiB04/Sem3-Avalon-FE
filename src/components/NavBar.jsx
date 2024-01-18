import React from "react";
import styles from './NavBar.module.css';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice"; 
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function NavBar() {

    
    const userToken = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('cart');
        dispatch(logout());
        //localStorage.clear();
    }

    const redirectToCart = () => {
        if( userToken !== null){
            navigate("/cart");
        }
        else{
            toast.info("You're not logged in!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                draggable: false,
            });
        }
    }

    const AuthenticatedLinks = [
        {
            id: 1,
            path: "/profilepage",
            text: "Profile Page"
        },
        {
            id: 2,
            path: "/",
            text: "Home Page"
        },
        {
            id: 4,
            path: "/productpage",
            text: "Product Page"
        }
    ];

    const UnauthenticatedLinks = [
        {
            id: 1,
            path: "/login",
            text: "Login Page"
        },
        {
            id: 2,
            path: "/",
            text: "Home Page"
        },
        {
            id: 3,
            path: "/register",
            text: "Register Page"
        },
        {
            id: 4,
            path: "/productpage",
            text: "Product Page"
        }
    ];

    // Set links based on userToken
    const links = userToken ? AuthenticatedLinks : UnauthenticatedLinks;

    return (
        <>
                <nav className={styles.navBar}>
            <NavLink to="/" className={styles.headerBrand}>Avalon</NavLink>
           <div className={styles.rightcontainer}>
           <button onClick={redirectToCart} className={styles.cartbutton}/>
            <div className={styles.dropdown}>

                <button className={styles.dropbtn}>Menu</button>
                <div className={styles.dropdownContent}>
                    {links.map(link => {
                        return (
                            <li className={styles.navItem} key={link.id}>
                                <NavLink to={link.path} className={styles.navLink}>{link.text}</NavLink>
                            </li>
                        );
                    })}
                    {userToken ? <NavLink to="/" onClick={handleLogOut} className={styles.navLink}>Log out</NavLink> : null}
                </div>
            </div>
           </div>
        </nav>
           
        </>
    );
}



export default NavBar;