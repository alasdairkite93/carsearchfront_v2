import '../Stylesheets/header/header.css';
import React, {useState} from "react";
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';
import '../Stylesheets/payment.css';
import Header from '../components/header';
import BlueLine from '../components/blueline';
import BackButton from '../components/backbutton';
import '../Stylesheets/challenge.css';
import VehicleDetails from '../components/vehicledetails';
import Footer from '../components/footer';
import LongBlueLine from "../components/longblue";
import '../Stylesheets/pay.css';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function MockPayment() {

    const location = useLocation();
    const pageinfo = location.state;
    console.log('SIGN UP PAGE STATE '+JSON.stringify(pageinfo));

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const pagestate = location.state;
    const handleOnSubmit = () => {

        //Suggested to wait for payment to be successful and then to add
        //customer contact details on payment success.
        navigate("/signup", { state: pagestate});

    }

    return (
        <div className="App">
            <Header/>
            <BlueLine/>
            <BackButton/>
            <div className="middle-element">
                <div className="two">
                    <div className="paymentinformation">
                            <input
                                type="text"
                                name="regnum"
                                id="creditbox"
                                placeholder="Credit or Debit Card"
                                required
                            />
                        <i className="arrow right"></i>
                    </div>
                    <div className="paymentinformation">
                        <input
                            type="text"
                            name="regnum"
                            id="mobilebox"
                            placeholder="Add to mobile bill"
                            required
                        />
                        <i className="arrow right"></i>
                    </div>
                    <div className="paymentinformation">
                        <input
                            type="text"
                            name="regnum"
                            id="paypalbox"
                            placeholder="PayPal"
                            required
                        />
                        <i className="arrow right"></i>
                    </div>
                    <button type="submit" id="formbutton" onClick={handleOnSubmit}>Continue</button>
                </div>
            </div>
            <Link to="/StripeRegister">Stripe Register</Link>
            <LongBlueLine/>
            <Footer/>
        </div>
    )
}