
import React, { Component } from 'react';

import '../Stylesheets/header/header.css';

import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';

export default function Header() {

        return (
        <div className="top-element">
            <div className="middle-element">
            <div className="two">
                        <h1 id="headertext">PCN Checker</h1>
                        <h2 id="headertitle">Get a PCN reminder</h2>
                    {/*<div className="threeheadertext">*/}
                    {/*    <h1 id="notgovsite">This is not a GOV.UK site</h1>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

