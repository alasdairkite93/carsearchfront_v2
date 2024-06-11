import '../../Stylesheets/header/header.css';
import React, {useState, useEffect} from "react";
import '../../Stylesheets/layout/centre.css';
import '../../Stylesheets/centre/centrestyles.css';
import Header from '../../components/header'
import BlueLine from '../../components/blueline'
import BackButton from '../../components/backbutton';
import '../../Stylesheets/challenge.css';
import Footer from '../../components/footer';
import LongBlueLine from "../../components/longblue";
import '../../Stylesheets/pay.css';
import '../../Stylesheets/forms.css'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';


export default function Activation() {

    const navigate = useNavigate();
    const location = useLocation();
    const pagestate = location.state;

    const [activationCode, setCode] = useState();


    console.log('Activation state: '+JSON.stringify(pagestate));

    function handleOnSubmit() {
        navigate("/signup", { state: pagestate});
    }

    return (

        <div className="App">
            <Header/>
            <BlueLine/>
            <BackButton/>
            <div className="middle-element">
                <div className="two">
                    <h1>One more step</h1>
                    <p>We sent you a text message with a 5-digit activation code, which expires in 24h.</p>
                    <p>Enter the code on this page to activate your reminder.</p>
                    <br/>
                    <p>Your activation code</p>
                    <input id="inputbox" type="text" value={activationCode} onInput={e => setCode(e.target.value)} required></input>
                    <div className="spacing">
                        <button type="submit" id="formbutton" onClick={handleOnSubmit}>Continue</button>
                    </div>
                </div>
            </div>
            <LongBlueLine/>
            <Footer/>
        </div>

    )

}