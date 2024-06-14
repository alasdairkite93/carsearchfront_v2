import { useState } from 'react'
import axios from "axios";

import './Stylesheets/header/header.css';
import './Stylesheets/layout/centre.css';
import './Stylesheets/centre/centrestyles.css';

import Header from './components/header';
import BlueLine from "./components/blueline";
import BackButton from "./components/backbutton";
import PCNInput from "./components/pcninput";
import LongBlueLine from "./components/longblue";
import Footer from "./components/footer";

import ExistingVehicles from "./components/existingvehicles";

import useToken from "../useToken";

function Home() {

    const {token, removeToken, setToken, effect} = useToken();

    // new line star
    return (
        <div className="App">
            <Header />
            <BlueLine />
            <BackButton/>
            <ExistingVehicles />
            <PCNInput token={token} setToken={setToken}/>
            <LongBlueLine/>
            <Footer />
        </div>
    );
}

export default Home;
