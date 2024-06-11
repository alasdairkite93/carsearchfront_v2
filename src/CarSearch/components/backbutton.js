import React, { Component } from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../Stylesheets/header/header.css';
import '../Stylesheets/forms.css';
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';

export default function BackButton() {

    let history = useNavigate();

    return (

        <div className="middle-element">
            <div className="straightlineback">
              <hr/>
                <div class="navbuttons">
                    <button id="formbutton" style={{marginRight: "20px", marginBottom: "10px"}} onClick={() => history(-1)}>Back</button>
                    <button id="formbutton"><Link style={{fontSize: "14px", color: "white", textDecoration: "none"}} to={"/"} >Check another vehicle</Link></button>
                </div>
            </div>
        </div>

    )

}