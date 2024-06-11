import React, {useState} from "react";
import Header from "../header";
import BlueLine from "../blueline";
import BackButton from "../backbutton";
import LongBlueLine from "../longblue";
import Footer from "../footer";
import {useLocation, useNavigate} from "react-router-dom";

export default function TextInput() {

    const navigate = useNavigate();
    const [text, setText] = useState('');

    const location = useLocation();
    const pagestate = location.state;

    console.log('TEXT INPUT STATE: '+JSON.stringify(pagestate));

    const handleOnClick = () => {
        navigate("/summary", { state: { contactdetail: text, vehcilestate: pagestate}});
    }

    return (
        <div className="App">
            <Header/>
            <BlueLine/>
            <BackButton/>
            <div className="middle-element">
                <div className="two">
                    <form>
                        <div className="forminput">
                            <h1>What is your mobile number?</h1>
                            <p><b>Mobile phone number</b></p>
                            <p id="greytext">Your reminder will be sent here</p>
                            <input id="inputbox" type="text" value={text} onInput={e => setText(e.target.value)} required></input>
                            <br/>
                            <button type="submit" id="formbutton" onClick={handleOnClick}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
            <LongBlueLine/>
            <Footer/>
        </div>
    )

}