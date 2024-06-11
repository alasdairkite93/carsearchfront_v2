import React from 'react';
import '../Stylesheets/header/header.css';
import '../Stylesheets/layout/centre.css';
import {useLocation} from "react-router-dom";
import Header from '../components/header'
import BlueLine from '../components/blueline'
import BackButton from '../components/backbutton';
import VehicleDetails from '../components/vehicledetails';
import Footer from '../components/footer';
import LongBlueLine from "../components/longblue";
import ReminderLink from "../components/ReminderLink";

export default function VehicleInformation() {

    const location = useLocation();
    const state = location.state;
    console.log('VEHICLE INFORMATION STATE: '+ JSON.stringify(state));

    return (
        <div className="App">
            <Header />
            <BlueLine />
            <BackButton/>
            <VehicleDetails state={state} />
            <LongBlueLine />
            <Footer />
        </div>

    )
}