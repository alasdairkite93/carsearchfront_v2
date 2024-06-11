import '../Stylesheets/header/header.css';
import React, {useState, useEffect} from "react";
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';
import Header from '../components/header'
import BlueLine from '../components/blueline'
import BackButton from '../components/backbutton';
import '../Stylesheets/challenge.css';
import Footer from '../components/footer';
import LongBlueLine from "../components/longblue";
import '../Stylesheets/pay.css';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';


export default function VehicleReminder() {

    const [email, setEmail] = useState(false);
    const [text, setText] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state;

    const handleEmailChange = (e) => {


        if (e.target.checked === true) {
            setEmail(true);
            setText(false);
        }

    }


    const handleTextChange = (e) => {

        if (e.target.checked === true) {
            setEmail(false);
            setText(true);
        }

    }

    const handleOnClick = () => {
        if (email === true){
            navigate("/email", {state: {vehicledetails: state}});
        }
        if (text === true) {
            navigate("/text", {state: {vehicledetails: state}});
        }
    }

    console.log('SELECT REMINDER STATE: '+JSON.stringify(state));

    return (
        <div className="App">
            <Header/>
            <BlueLine/>
            <BackButton/>
            <div className="middle-element">
                <div className="two">
                    <h1>What type of reminder do you want to get ?</h1>
                    <form>
                        <br/><br/>
                        <label>

                            <input
                                type="radio"
                                name="contact"
                                value="email"
                                onChange={
                                    handleEmailChange
                                }
                            />
                            Email
                        </label>
                        <br/><br/>
                        <label>
                            <input
                                type="radio"
                                name="contact"
                                value="text"
                                onChange={handleTextChange}
                            />
                            Text to my mobile phone </label>
                        <br/><br/>
                        <button type="submit" id="formbutton" onClick={handleOnClick}>Continue</button>
                    </form>
                    <div className="pricebox">
                        <h3>1 month free</h3>
                        <p>the £1 per month for maximum of 2 cars and £5 per month for company fleets maximum of 10 cars</p>
                    </div>
                </div>
            </div>
            <LongBlueLine />
            <Footer />
        </div>

    )
};
