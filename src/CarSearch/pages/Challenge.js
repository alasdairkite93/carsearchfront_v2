import '../Stylesheets/header/header.css';
import React from "react";
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';
import Header from '../components/header'
import BlueLine from '../components/blueline'
import BackButton from '../components/backbutton';
import '../Stylesheets/challenge.css';
import VehicleDetails from '../components/vehicledetails';
import Footer from '../components/footer';
import LongBlueLine from "../components/longblue";

export default function challenge() {

    return (
        <div className="App">
            <Header/>
            <BlueLine/>
            <BackButton/>
            <div className="middle-element">
                <div className="two">
                    <div className="challengecontainer">
                        <div className="challengecontainertext">
                            <h2>Information about challenging a PCN</h2>
                            <p>If you have received a Penalty Charge Notice (PCN) and
                                you want to make a challenge or representation (appeal), the
                                process you follow depends on what stage the notice has reached.</p>
                            <div className="pinkbox">
                                <p><b>Please ensure you carefully read the details stated on your PCN.</b></p>
                                <p><b>If payment is made the case will be closed and you cannot appeal, this is taken as
                                    you accepting liability.
                                    You may not receive a reply to your correspondence.</b></p>
                            </div>
                            <h4><b>Before you challenge a PCN (appeal)</b></h4>
                            <p>You should <span id="pinktext">view the evidence </span>that was collected by the Civil
                                Enforcement Officer (CEO).</p>
                            <p>When submitting your challenge, please ensure you provide:</p>
                            <ul>
                                <li>PCN number</li>
                                <li>Vehicle Registration (VRM)</li>
                                <li>Your name and address</li>
                                <li>Supporting evidence i.e. blue badge, payment voucher, medical proof should be
                                    attached.
                                </li>
                            </ul>

                            <p><b>Failure to provide this information may delay the appeals process.</b></p>
                            <div className="buttoncontainer">
                                <button id="challengebutton">Challenge your Penalty Charge Notice online</button>
                            </div>
                            <p>You can also submit your challenge or representation by post to:</p>
                            <ul id="address">
                                <li>London Borough of Brent (Parking Services),</li>
                                <li>PO Box 210,</li>
                                <li>Sheffield, S98 1NE</li>
                            </ul>
                            <p>All timescales begin from the date on which the relevant notice of rejection was
                                served.</p>
                            <h4><b>What happens next?</b></h4>
                            <p>Once we receive your challenge the case is put on hold until a full reply has been sent,
                                we will aim to
                                reply to you within 21 days of receiving it.</p>
                            <p>If you have received another notice from us in the period in-between, please don't ignore
                                it. Please
                                check the PCN number and follow the process outlined on the letter.</p>
                            <p>While we do reply to online challenges by email wherever possible, the law does require
                                us to send
                                some responses by post.</p>
                            <p><b>You can find more information on <span id="pinktext">understanding the penalty charge process,</span> and
                                the stages involved.</b></p>
                        </div>
                        <div className="challengecontainercontents">
                            <p>Contents area</p>
                        </div>
                    </div>
                </div>
            </div>
            <LongBlueLine/>
            <Footer/>
        </div>
    )
}