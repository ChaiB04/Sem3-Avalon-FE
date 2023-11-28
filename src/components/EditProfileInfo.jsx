import React, { useEffect, useState } from "react";
import styles from '../components/ProfileInfo.module.css'
import userService from "../services/UserService";


function EditProfileInfo({ props }) {
    const [id, setId ]= useState(0);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        // password: "",
        phonenumber: "",
        street: "",
        housenumber: 0,
        city:"",
        picture: []
    });

    useEffect(() => {
        // Update the form data when the component mounts or when the user prop changes
        if (props) {
            setId(props.id);
            setFormData({
                firstname: props.firstname || "",
                lastname: props.lastname || "",
                email: props.email || "",
                // password: props.password || "",
                phonenumber: props.phonenumber || "",
                street: props.street || "",
                housenumber: props.housenumber || 0,
                city: props.city || "",
                picture: props.picture || []
            });
        }
    }, [props]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRefresh = () => {
      window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log({id});
        // console.log(props);
        // Send a POST request to your backend API
        await userService
          .editAccount(id, formData)
          .then(handleRefresh())
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Please fill in the field correctly.", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                draggable: false,
                className: styles.toastNotification,
              });
            } else if (error.response && error.response.data) {
              if (error.response.data.message.includes("JSON parse error:")) {
                toast.error("Could not create user.");
              }
            } else {
              toast.error("An unknown error occurred.");
            }
          });
      };

      const openFileExplorer = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".jpg,.jpeg";
        input.onchange = handleFileSelect;
        input.click();
      };
    

      const handleFileSelect = async (event) => {
        event.preventDefault();
      
        const file = event.target.files[0];
        if (file) {
          if (file.type === "image/jpeg" || file.type === "image/jpg") {
            const reader = new FileReader();
            reader.onload = (e) => {
              const arrayBuffer = e.target.result;
              const byteArray = new Uint8Array(arrayBuffer);
              const base64String = btoa(String.fromCharCode.apply(null, byteArray));
    
              setFormData({ ...formData, picture: base64String });
            };
            reader.readAsArrayBuffer(file);
          } else {
            alert("Please select a file of type JPG or JPEG.");
          }
        }
      };

    return (
        <>
            <div className={styles.container}>
                <button onClick={openFileExplorer} className={styles.button}>Edit picture</button>
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
                    <form onSubmit={handleSubmit}>
                        <input
                            className={styles.textBoxes}
                            type="text"
                            name="firstname"
                            placeholder="Firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={styles.textBoxes}
                            type="text"
                            name="lastname"
                            placeholder="Lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={styles.textBoxes}
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={styles.textBoxes}
                            type="text"
                            name="phonenumber"
                            placeholder="Phonenumber"
                            value={formData.phonenumber}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={styles.textBoxes}
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={formData.street}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={styles.textBoxes}
                            type="text"
                            name="housenumber"
                            placeholder="Housenumber"
                            value={formData.housenumber}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            className={styles.textBoxes}
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                        <button className={styles.button}>Edit</button>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileInfo;
