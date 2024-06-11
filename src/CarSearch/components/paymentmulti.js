import Header from "./header";
import BlueLine from "./blueline";
import BackButton from "./backbutton";
import '../Stylesheets/header/header.css';
import React, {useState} from "react";
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';
import '../Stylesheets/payment.css';
import '../Stylesheets/challenge.css';
import VehicleDetails from '../components/vehicledetails';
import Footer from '../components/footer';
import LongBlueLine from "../components/longblue";
import '../Stylesheets/pay.css';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function PaymentMulti() {

    const location = useLocation();
    const pageinfo = location.state;
    console.log('SIGN UP PAGE STATE ' + JSON.stringify(pageinfo));

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const pagestate = location.state;
    const handleOnSubmit = () => {

        navigate("/signup", {state: pagestate});

    }

    return (
        <div className="App">
            <Header/>
            <BlueLine/>
            <BackButton/>

            <div className="middle-element">
                <div className="two" >
                        <div className="paygrid" >
                            <div className="paymiddle" >
                                <div className="paybuttoncontainer">
                                    <button id="singlepayment">
                                        <Link style={{fontSize: "12px", color: "black", textDecoration: "none"}} to={"/vehicleinformation"} state={pageinfo}>


                                            <div className="paybuttongrid">
                                                <div className="paybuttonleft">
                                                    <span className="dot"></span>
                                                </div>
                                                <div className="paybuttonright">
                                                    <h1>Single Payment</h1>
                                                    <p>Pay a single invoice</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </button>
                                    <button id="singlepayment">
                                        <Link style={{fontSize: "12px", color: "black", textDecoration: "none"}} to={"/vehicleinformation"} state={pageinfo}>
                                            <div className="paybuttongrid">
                                                <div className="paybuttonleft">
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                </div>
                                                <div className="paybuttonright">
                                                    <h1>Multiple Payment</h1>
                                                    <p>Make payments against two or more invoices</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </button>
                                    <button id="singlepayment">
                                        <div>
                                            <Link style={{fontSize: "12px", color: "black", textDecoration: "none"}} to={"/vehicleinformation"}
                                                  state={pageinfo}>

                                                <h1>Please note</h1>
                                                <span>If you have been visited by one of our enforcement agents,
                                additional costs may have been incurred for which you will need
                                to contact the office in order to obtain the unpaid balance
                                figure.</span>
                                                <p><b>These charges are legally payable.</b></p>
                                            </Link>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            <LongBlueLine/>
            <Footer/>
            </div>
    )
}