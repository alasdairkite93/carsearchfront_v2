import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../Stylesheets/header/header.css';
import {Link, useNavigate} from 'react-router-dom';
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';
import '../Stylesheets/forms.css';
import '../Stylesheets/infopage.css'

import {renderurl} from "./globalvar";

export default function PCNInput(props) {


    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState();
    const [errormsg, setErrorMsg] = useState();

    const items = [];


    useEffect(() => {

        axios({

            method: "POST",
            // url: 'http://127.0.0.1:4242/getPaid',
            url: renderurl + '/existingvehicles',
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username'),
            }

        }).then((response) => {
            console.log('existing vehicles response: '+JSON.stringify(response))
            console.log(response.data[0].vehiclemake)
            for (let i=0; i<response.data.length; i++){
                items.push(<li key={i}><Link to={"/vehicleinformation"} state={response.data[i]}>{response.data[i].vehiclemake}</Link></li>);
            }
            setVehicle(items);
        });

    }, []);

    const handleSubmit = async function (e) {

        e.preventDefault();

        let reg_number = e.target.regnum.value.toUpperCase();
        let pcn_number = e.target.pcnnum.value.toUpperCase();

        console.log('regnum: '+reg_number);
        console.log('pcnNumber: '+pcn_number);

        const username = localStorage.getItem('username');

        try {
            // const {data} = await axios.post('https://emailback2.onrender.com/postrequest', {
            const {data} = await axios.post(renderurl+'/postrequest', {

                reg_number,
                pcn_number,
                username
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + props.token
                },
            })

            console.log('DATA: ', data.msg);
            const msg = data.msg;
            setErrorMsg(msg)

            if (data.registration.includes("could not be found")) {
                document.getElementById("error").innerHTML = data.msg;
            }
            else {
                console.log('FLASK RESPONSE: ' + data);
                navigate("/vehicleinformation", {state: data});
            }
        }
        catch (error) {
            console.log('error response: '+errormsg);
            // if (error.status.code == 401){
            //     window.location.reload();
            // }
            // throw new Error(error);
        }

        //Add error handling for whether the data was returned correctly
    }

    return (
        <div className="middle-element">
            <div className="two">
                <p style={{fontSize: "15px"}}><b>View parking penalty charge notice (PCN) issued by local council and Transport for London</b></p>
                <br/>

                    {vehicle &&
                        <div>
                            <ul>
                                Existing vehicles:
                                {vehicle}
                            </ul>
                        </div>
                    }

                <h1>What is the vehicle's registration number? </h1>
                <form onSubmit={handleSubmit} >
                    <label><b>Registration number (number plate)</b></label>
                    <p id="exampletext">For example CU57ABC</p>
                    <input
                        type="text"
                        name="regnum"
                        id="inputbox"
                        autoCapitalize="on"
                        required
                    />
                    <br/><br/>
                    <label><b>Penalty Charge Notice (PCN) number</b></label>
                    <p id="exampletext">Optional</p>
                    <input
                        type="text"
                        name="pcnnum"
                        autoCapitalize="on"
                        id="inputbox"
                        // pattern="^['A-Z']['A-Z'][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"
                        required
                    />
                    <br/><br/>
                    <p style={{color: "red"}}><b>{errormsg}</b></p>
                    <button type="submit" id="formbutton">Continue</button>
                </form>
                <p><i><b>Disclaimer</b> This is a third party service not provided by GOV.UK</i></p>

            </div>
        </div>
    )

}