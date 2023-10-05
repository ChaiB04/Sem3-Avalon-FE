import React, { useState } from "react";
import DataService from "../services/UserService.js";

const AddUser = () => {
    const initialUserState = {
        id: null,
        email: "",
        password: "",
        firsname: "",
        lastname: "",
        street: "",
        housenumber: null,
        zipcode: "",
        city: "",
        country: "",
        phonenumber: ""
    };

    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useSate(false);

    const handleInputChance = event => {
        const { name, value } = event.target;
        setUser({...user, [name]: value});
    };

    const saveUser = () => {
        var data = {
            email: user.email,
            password: user.password,
            firsname: user.firsname,
            lastname: user.lastname,
            street: user.street,
            housenumber: user.housenumber,
            zipcode: user.zipcode,
            city: user.city,
            country: user.country,
            phonenumber: user.phonenumber
        };

        DataService.create(data)
        .then(response => {
            setUser({
                id: response.data.id,
                // email: response.data.email,
                // password: response.data.password,
                // firstname: response.data.firstname,
                // lastname: response.data.lastname,
                // street: response.data.street,
                // housenumber: response.data.housenumber,
                // zipcode: response.data.zipcode,
                // city: response.data.city,
                // country: response.data.country,
                // phonenumber: response.data.phonenumber
            })
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    };

    const newUser = () =>{
        setUser(initialUserState);
        setSubmitted(false);
    }

    return(
        <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
          </div>
        ) : (
            <div>
            <h4>You submitted unsuccessfully</h4>
          </div>
        )}
        </div>

    )

}

export default AddUser;