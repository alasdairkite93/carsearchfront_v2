import './Stylesheets/header/header.css';
import React, {useState, useEffect} from "react";
import './Stylesheets/layout/centre.css';
import './Stylesheets/centre/centrestyles.css';
import Header from './header'
import BlueLine from './blueline'
import BackButton from './backbutton';
import './Stylesheets/challenge.css';
import './Stylesheets/pay.css';
import './Stylesheets/forms.css'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import LongBlueLine from "./longblue";
import Footer from "./footer";


export default function PostsubmitOld(props) {

    const location = useLocation();

    const pagestate = props.infovals;

    console.log('registration: '+pagestate.registration)
    console.log('PostSubmitOld: props.infovals '+JSON.stringify(props.infovals));

    function handleShowOther() {
        props.onDataChange("pcninput");
    }

    function handleGetInfo(){
        props.onDataChange("reminder");
    }

    return (
        <div className="App">
        <BackButton />
            <div className="middle-element">
                <div className="two">
                    <p >{pagestate.registration}</p>
                    <h1>{pagestate.info.make}</h1>
                    <Link style={{fontSize: "12px"}} onClick={handleShowOther}>Check another vehicle</Link>
                    <p><Link style={{fontSize: "12px", marginBottom: "10px"}}
                             state={{ticket: pagestate}} onClick={handleGetInfo}>Get Information and Subscribe</Link></p>

                </div>
                <div className="vehiclegrid">
                    <div className="oneinformation">
                        <h5 style={{color: "#808080"}}>Colour</h5>
                        <h4>{pagestate.info.color}</h4>
                        {/*<Link style={{fontSize: "12px"}} to={"/vehicleinformation"} state={{ticket: this.state.flask_response}}>Get a PCN reminder</Link>*/}
                    </div>
                    <div className="twoinformation">
                        <h5 style={{color: "#808080"}}>Fuel Type</h5>
                        <h4>{pagestate.info.fuel}</h4>
                    </div>
                </div>
                <div className="vehiclegrid">
                    <div className="oneinformation">
                        <h3>Outstanding Tickets (1)</h3>
                        <table id="summarytable">
                            <tr>
                                <td >{pagestate.council} (1)</td>
                                <td><Link style={{fontSize: "14px", marginBottom: "10px"}} to={"/reminder"}
                                          state={{ticket: pagestate}}>View</Link></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <LongBlueLine/>
            <Footer/>
        </div>
    )
}