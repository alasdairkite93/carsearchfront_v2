import {useState} from "react";
import axios from "axios";
import {renderurl} from "../globalvar";

import {Navigate, useNavigate} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function User_Pass(visItem) {

    const nav = useNavigate();

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: ""
    })

    function registerMe(event) {


        //Will set local storage values to the form here
        localStorage.setItem("username", registerForm.username)
        localStorage.setItem("password", registerForm.password)

        event.preventDefault();

        visItem.onDataChange("cardetails");

    }

    function handleRegisterChange(event) {

        const {value, name} = event.target
        setRegisterForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }


    return (

        <form>
            <label id="labelreg" htmlFor="username">Username:</label>
            <input onChange={handleRegisterChange} text={registerForm.username} type="text" name="username"
                   value={registerForm.username} required/>
            <label id="labelreg" htmlFor="password">Password:</label>
            <input onChange={handleRegisterChange} text={registerForm.password} type="password" name="password"
                   value={registerForm.password} required minLength="6" maxLength="20"/>
            <div class="form-group">
                <button id="regbut" onClick={registerMe}>Submit</button>
            </div>
        </form>

    )

}