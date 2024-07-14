import './Stylesheets/header/header.css';
import React, {useState, useEffect} from "react";
import './Stylesheets/layout/centre.css';
import './Stylesheets/centre/centrestyles.css';
import Header from './header'
import BlueLine from './blueline'
import BackButton from './backbutton';
import './Stylesheets/challenge.css';
import Footer from './footer';
import LongBlueLine from "./longblue";
import './Stylesheets/pay.css';
import './Stylesheets/forms.css';
import axios from "axios";
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';


export default function SummaryPage(props) {


    const navigate = useNavigate();
    const location = useLocation();
    const state = props.infoVals;

    console.log('Summary page state: ' + JSON.stringify(state));


    function handleOnSubmit() {

        //Proposed add record to database to signup
        props.onDataChange("registernew");
        // navigate("/payment", { state: { contactdetail: state.contactdetail, vehcilestate: state.vehcilestate.vehicledetails}});
    }

    return (

        <div className="App">
            <div className="middle-element">
                <div className="two">
                    <hr style={{marginTop: "60px"}}/>
                    <div className="tablecontainer">
                        <h1 style={{fontSize: "40px"}}>Check your details</h1>
                        <p>Make sure the vehicle and your contact details are correct.</p>
                        <h2 style={{fontSize: "25px"}}>Vehicle details</h2>
                        <table>
                            <tr>
                                <td>Registration number</td>
                                <td><b>{state.registration}</b></td>
                                <td><Link >Change </Link></td>
                            </tr>
                            <tr>
                                <td>Make</td>
                                <td><b>{state.make}</b></td>
                            </tr>
                            <tr>
                                <td>Colour</td>
                                <td><b>{state.color}</b></td>
                            </tr>
                            <tr>
                                <td>Date of offence</td>
                                <td><b>{state.date}</b></td>
                            </tr>
                            <tr>
                                <td>MOT due date</td>
                                <td><b>{state.motexpirty}</b></td>
                            </tr>
                        </table>
                    </div>
                    <Link>Incorrect vehicle details?</Link>
                    <div className="tablecontainer">
                        <h2 style={{fontSize: "25px"}}>Contact details</h2>
                        <table>
                            <tr>
                                <td>Contact detail</td>
                                <td><b>{state.contactdetail}</b></td>
                                <td><Link>Change</Link></td>
                            </tr>
                        </table>
                    </div>
                    <div className="spacing">
                        <button type="submit" id="formbutton" onClick={handleOnSubmit}>Continue</button>
                    </div>
                </div>

            </div>

        </div>

    )


}