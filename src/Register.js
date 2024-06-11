import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate} from "react-router-dom";


export default function Register() {

    const navigate = useNavigate();
    // const {isLoggedIn, register, login} = useAuth();
    // const {createcustomer} = usePay();

    const handleOnSubmit = (e) => {
        // register(e);
        // login(e);
    }

    return (
        <>
            {/*<Nav_Comp />*/}
            <h1>Register to use this site</h1>
            {/*{isLoggedIn ? (*/}
            {/*    <p>You are already logged in</p>*/}
            {/*) : (*/}
                <form onSubmit={handleOnSubmit} >
                    <p>You need to create an account before using this service</p>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" required/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" required/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" required/>
                    <button type="submit">Submit</button>
                </form>

        </>
    )
}