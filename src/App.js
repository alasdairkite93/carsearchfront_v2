import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'
import RegHeader from './RegHeader'
import useToken from './useToken'
import {Link} from "react-router-dom";
import Nav from "./Components/Nav";
import Payment from "./Components/Payment";
import Dashboard from "./Components/dashboard";

import Home from "./CarSearch/Home";
import Postsubmit from "./CarSearch/pages/postsubmit";
import VehicleInformation from "./CarSearch/pages/VehicleInformation";
import MockPayment from "./CarSearch/pages/MockPayment";
import Challenge from "./CarSearch/pages/Challenge";
import VehicleReminder from "./CarSearch/pages/reminder";
import EmailInput from "./CarSearch/components/formfiles/emailinput";
import TextInput from "./CarSearch/components/formfiles/textinput";
import SummaryPage from "./CarSearch/pages/summarypage";
import Activation from "./CarSearch/components/formfiles/activation";
import SignUp from "./CarSearch/components/formfiles/signup";

import PrivatePaymentRoute from "./Components/privatePaymentRoute";

//CarSearchGraphComps
import Header from "./CarSearch/components/header";
import BlueLine from "./CarSearch/components/blueline";
import LongBlueLine from "./oldpcnchecker/longblue";
import Footer from "./oldpcnchecker/footer";
import React from "react";

import LoginButton from "./CarSearch/components/registration/LoginButton";

function App() {
    const {token, removeToken, setToken, effects} = useToken();

    return (
        <BrowserRouter>
            <div >
                <Header />
                <BlueLine />
                {!token && token !== "" && token !== undefined ?
                    <Login setToken={setToken}/>
                    : (
                        <>
                            <RegHeader token={removeToken}/>
                            <Nav token={token} setToken={setToken}/>
                            <Routes>
                                <Route exact path="/profile"
                                       element={<Profile token={token} setToken={setToken} />}></Route>
                                <Route exact path="/payment"
                                       element={<Payment token={token} setToken={setToken}/>}></Route>
                                <Route exact path="/showall"
                                        element={<Dashboard token={token} setToken={setToken}/>}></Route>

                                <Route element={<PrivatePaymentRoute token={token} />}>
                                    <Route exact path="/"
                                           element={<Home token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/postsubmit"
                                           element={<Postsubmit token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/vehicleinformation"
                                           element={<VehicleInformation token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/mockpayment"
                                           element={<MockPayment token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/challenge"
                                           element={<Challenge token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/reminder"
                                           element={<VehicleReminder token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/email"
                                           element={<EmailInput token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/text"
                                           element={<TextInput token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/summary"
                                           element={<SummaryPage token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/activation"
                                           element={<Activation token={token} setToken={setToken}/>}></Route>
                                    <Route exact path="/signup"
                                           element={<SignUp token={token} setToken={setToken}/>}></Route>
                                </Route>

                            </Routes>
                            </>
                    )}
                <LongBlueLine/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;