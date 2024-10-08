import '../Stylesheets/header/header.css';
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';
import {useLocation} from "react-router-dom";
import { Link } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function VehicleDetails() {

    const location = useLocation();
    const state = location.state;
    console.log('VEHICLE DETAILS STATE: '+JSON.stringify(state));
    console.log('TESTING: '+JSON.stringify(state.registration));
    return (

        <div className="App">
            <div className="middle-element">
                <div className="two" >
                    <p style={{lineHeight: "0px", fontSize: "25px"}}>{state.registration}</p>
                    <h1 style={{fontSize: "40px"}}>{state.make}</h1>
                </div>
                <div className="three">
                    <div className="vehiclegrid" style={{marginTop: "150px"}}>
                    <div className="oneinformation">
                        <h5 id="greycol">Colour</h5>
                        <h4 style={{fontSize: "20px"}}>{state.color}</h4>
                    </div>
                    <div className="twoinformation">
                        <h5 id="greycol">Fuel Type</h5>
                        <h4 style={{fontSize: "20px"}}>{state.fuel} </h4>
                    </div>

                    <div className="threeinformation">
                        <h5 id="greycol">Date of Offence</h5>
                        <h4 style={{fontSize: "20px"}} >{state.date}</h4>
                    </div>
                    <div className="fiveinformation">
                        <h5 id="greycol">Action</h5>
                        <div style={{marginBottom: "15px"}} className="fiveinformationcontent">
                            <Link to={"/multipayment"} style={{fontSize: "20px", color: "#4C8EC0"}} state={state}><b>Pay Now</b></Link>
                            <span>&nbsp; &nbsp; &nbsp;</span>
                            <Link to={"/challenge"} style={{fontSize: "20px", color: "#4C8EC0"}} state={state}><b>Challenge</b></Link>
                        </div>
                    </div>

                    </div>
                </div>
                <div className="four">
                    <div className="vehiclegridimage">
                        <div className="vehiclegridone">
                            <p>{state.council} Council believes that you are liable to pay a penalty charge with respect
                            to the above vehicle for the following alleged contravention.</p>
                            <p><b>Contravention: </b>{state.contravention}</p>
                            <p>In {state.location} on {state.date} at {state.time}</p>
                        </div>
                        <div className="vehiclegridtwo">
                            <img src="https://res.cloudinary.com/dsfypcapq/image/upload/v1713902802/whitebmw_ucbz14.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}
