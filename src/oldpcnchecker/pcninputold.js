import React, {useState} from 'react';
import axios from "axios";
import './Stylesheets/header/header.css';
import {Link, useNavigate} from 'react-router-dom';
import './Stylesheets/layout/centre.css';
import './Stylesheets/centre/centrestyles.css';
import './Stylesheets/forms.css';
import './Stylesheets/infopage.css'


import {renderurl} from "../CarSearch/components/globalvar";


export default function PCNInputOld(visitem) {

    const [regnum, setReg] = useState();
    const [pcnnum, setPcn] = useState();
    const [flaskresponse, setResponse] = useState();
    const navigate = useNavigate();

    const [dataOnCar, setDataOnCar] = useState({
        pcn: "",
        registration: ""
    })

    function handleVehicChange(event) {

        const {value, name} = event.target
        setDataOnCar(prevNote => ({
            ...prevNote, [name]: value
        }))

    }
    const handleSubmit = async function (e) {

        e.preventDefault();

        let reg_number = e.target.registration.value.toUpperCase();
        let pcn_number = e.target.pcn.value.toUpperCase();

        console.log('regnum: '+reg_number);
        console.log('pcnNumber: '+pcn_number);

        setPcn(pcn_number);
        setReg(reg_number);

        localStorage.setItem('pcn', pcn_number);
        localStorage.setItem('reg', reg_number);


        try {
            // const {data} = await axios.post('https://emailback2.onrender.com/postrequest', {
            const {data} = await axios.post(renderurl+'/postrequestrequest', {

                reg_number,
                pcn_number
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('DATA: ', data);

            setResponse(data);

            if (data.registration.includes("could not be found")) {
                document.getElementById("error").innerHTML = "Error these credentials are not recognised,";
            }
            else {
                console.log('FLASK RESPONSE: ' + data);

                visitem.carData(data);
                visitem.newData(dataOnCar);

                visitem.onDataChange("postsubmit");
                // navigate("/postsubmit", {state: data});
            }
        }
        catch (e) {
            document.getElementById("error").innerHTML = "Error these credentials are not recognised,";
        }

        //Add error handling for whether the data was returned correctly
    }

    return (
        <div className="middle-element">
            <div className="two">
                <p style={{fontSize: "15px"}}><b>View parking penalty charge notice (PCN) issued by local council and Transport for London</b></p>
                <br/>
                <p id="error"></p>
                <h1>What is the vehicle's registration number? </h1>

                <form onSubmit={handleSubmit} >
                    <label><b>Registration number (number plate)</b></label>
                    <p id="exampletext">For example CU57ABC</p>
                    <input
                        type="text"
                        name="registration"
                        onChange={handleVehicChange}
                        id="inputbox"
                        autoCapitalize="on"
                        required
                    />
                    <br/><br/>
                    <label><b>Penalty Charge Notice (PCN) number</b></label>
                    <p id="exampletext">Optional</p>
                    <input
                        type="text"
                        name="pcn"
                        onChange={handleVehicChange}
                        autoCapitalize="on"
                        id="inputbox"

                        // pattern="^['A-Z']['A-Z'][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"
                        required
                    />
                    <br/><br/>
                    <button type="submit" id="formbutton">Continue</button>
                </form>
                <p><i><b>Disclaimer</b> This is a third party service not provided by GOV.UK</i></p>

            </div>
        </div>
    )

}