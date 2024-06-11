import '../../Stylesheets/header/header.css';
import React, {useState, useEffect} from "react";
import '../../Stylesheets/layout/centre.css';
import '../../Stylesheets/centre/centrestyles.css';
import '../../Stylesheets/forms.css';
import Header from '../header'
import BlueLine from '../blueline'
import BackButton from '../backbutton';
import '../../Stylesheets/challenge.css';
import Footer from '../footer';
import LongBlueLine from "../longblue";
import '../../Stylesheets/pay.css';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';

export default function EmailInput() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const location = useLocation();
    const pagestate = location.state;
    const handleOnSubmit = () => {

        navigate("/summary", { state: { contactdetail: email, vehcilestate: pagestate}});

    }

    console.log('EMail input state: '+JSON.stringify(pagestate));

    return (
        <div className="App">
            <Header/>
            <BlueLine/>
            <BackButton/>
            <div className="middle-element">
                <div className="two">
                    <form>
                        <div className="forminput">
                            <h1>What is your email address?</h1>
                            <p><b>Email address</b></p>
                            <p id="greytext">Your reminder will be sent here</p>
                            <input id="inputbox" type="text" value={email} onInput={e => setEmail(e.target.value)} required></input>
                            <br/>
                            <button type="submit" id="formbutton" onClick={handleOnSubmit}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
            <LongBlueLine />
            <Footer />
        </div>
    )

}