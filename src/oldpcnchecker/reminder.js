import './Stylesheets/header/header.css';
import React, {useState, useEffect} from "react";
import './Stylesheets/layout/centre.css';
import './Stylesheets/centre/centrestyles.css';
import BackButton from './backbutton';
import './Stylesheets/challenge.css';
import Footer from './footer';
import LongBlueLine from "./longblue";
import './Stylesheets/pay.css';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';


export default function VehicleReminder(visitem) {

    const [email, setEmail] = useState(false);
    const [text, setText] = useState(false);

    const [preference, setPreference] = useState("mobile");

    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state;

    const handleEmailChange = (e) => {


        if (e.target.checked === true) {
            setEmail(true);
            setText(false);
        }

    }

    function handleChange(event) {
        console.log(event.target.value);
        setPreference(event.target.value);
        console.log('Preference: '+preference);
    }


    const handleTextChange = (e) => {

        if (e.target.checked === true) {
            setEmail(false);
            setText(true);
        }

    }

    const handleOnClick = () => {
        if (preference === "email"){
            visitem.onDataChange("email");
        }
        if (preference === "mobile") {
            visitem.onDataChange("mobile");
        }
    }

    return (
        <div className="App">
            {/*<BackButton/>*/}
            <div className="middle-element">
                <div className="two">
                    <h1>What type of reminder do you want to get ?</h1>
                    <form>
                        <br/><br/>
                        <select name="preference" id="selcont" onChange={handleChange}>
                            <option value="mobile" selected>Mobile</option>
                            <option value="email">Email</option>
                        </select>
                        <br/><br/>
                        <button type="submit" id="formbutton" onClick={handleOnClick}>Continue</button>
                    </form>
                    <div className="pricebox">
                        <h3>1 month free</h3>
                        <p>the £1 per month for maximum of 2 cars and £5 per month for company fleets maximum of 10 cars</p>
                    </div>
                </div>
            </div>

        </div>

    )
};
