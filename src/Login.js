import {useEffect, useState} from 'react';
import axios from "axios";
import {renderurl} from "./CarSearch/components/globalvar";

import User_Pass_img from "./CarSearch/components/registration/user_pass_img";
import User_Pass from "./CarSearch/components/registration/user_pass";

import CarImg from "./CarSearch/components/registration/car_img";
import CarInput from "./CarSearch/components/registration/carinput";

import ContactInput from "./CarSearch/components/registration/ContactInput";
import ContImg from "./CarSearch/components/registration/contimg";

import PaymentPage from "./CarSearch/components/registration/payment";

import StripeApp from "./CarSearch/components/stripeComponents/StripeApp";
import StripeImg from "./CarSearch/components/registration/stripe_img";

import Login_Img from "./CarSearch/components/registration/login_img";

import PCNInputOld from "./oldpcnchecker/pcninputold";

import PostsubmitOld from "./oldpcnchecker/postsubmit";

import VehicleReminder from "./oldpcnchecker/reminder";

import EmailInput from "./oldpcnchecker/emailinput";

import TextInput from "./oldpcnchecker/textinput";

import SummaryPage from "./oldpcnchecker/summarypage";

import RegisterNew from "./Components/registernew";

import './signup.css';

import LoginButton from "./CarSearch/components/registration/LoginButton";

function LoginToken(props) {


    const [emailError, setEmailError] = useState('');

    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
    })

    const [contactForm, setContactForm] = useState({
        email: "",
        mobile: "",
        preference: ""
    })

    const [dataOnCar, setDataOnCar] = useState({
        pcn: "",
        vim: ""
    })

    const [vimNum, setVimNum] = useState();

    const [visibleItem, setVisibleItem] = useState('login');
    const [errorMessage, setErrorMessage] = useState('');

    const [dataUpdate, setDataUpdate] = useState();

    const [mobileVal, setMobileVal] = useState();

    const [emailVal, setEmailVal] = useState();


    function logMeIn(event) {
        axios({
            method: "POST",
            // url: "http://127.0.0.1:4242/token",
            url: renderurl+"/token",
            data: {
                username: loginForm.username,
                password: loginForm.password
            }
        })
            .then((response) => {
                localStorage.setItem('username', loginForm.username);
                console.log('Login response token: ' + response.data.access_token)
                props.setToken(response.data.access_token)
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

        setloginForm(({
            username: "",
            password: ""
        }))

        event.preventDefault()
    }

    function checkEmail(email){
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    //propose using effect of where payment is successful using the success url then adding
    //details to the database here
    useEffect(() => {
        let href = window.location.href;
        let bool_href = href.includes("success");

        const querystring = window.location.search;

        const urlparams = new URLSearchParams(querystring);

        const sessionid = urlparams.get('session_id');

        if (bool_href) {


            //have to extract the sessionID parameter from the URL

            let pcn1 = localStorage.getItem('pcn1');
            let vim1 = localStorage.getItem('vim1');
            let twocars = 1
            let pcn2 = '';
            let vim2 = '';

            let vim = localStorage.getItem('vim');

            let user = localStorage.getItem("username");
            let pass = localStorage.getItem("password");

            let pcn = localStorage.getItem('pcn');
            let reg = localStorage.getItem('reg');


            let email = localStorage.getItem('email');
            let mobile = localStorage.getItem('mobile');
            let pref = localStorage.getItem('pref');
            console.log('email: '+user)

            //Remeber to add num cars to request
            axios({
                method: "POST",
                url:renderurl+'/addnewuser',
                data: {
                    username: user,
                    password: pass,
                    pcn1: pcn,
                    registration: reg,
                    vim: vim,
                    twocars: twocars,
                    email: email,
                    mobile: mobile,
                    preferences: pref,
                    pcn2: pcn2,
                    vim2: vim2,
                    session_id: sessionid
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + props.token
                },
            }).then((response) => {
                console.log('addnewuser response: '+JSON.stringify(response));
            })

        }

    }, []);


    function handleChange(event) {
        const {value, name} = event.target
        setloginForm(prevNote => ({
                ...prevNote, [name]: value
            })
        )
    }

    function handleVisChange(data) {
        console.log('dataoncar: '+JSON.stringify(dataOnCar));
        setVisibleItem(data);
    }

    function handleAxiosData(data) {
        console.log('handleData: '+JSON.stringify(data));
        setDataOnCar(data);
        // setDataUpdate(data);
    }

    function handleVehicData(data) {
        console.log('dataoncar: '+JSON.stringify(dataOnCar));

        setDataUpdate(data);
    }

    function handleMobile(data) {
        console.log('dataoncar: '+JSON.stringify(dataOnCar));

        setMobileVal(data);
    }

    function handleVim(data) {
        setVimNum(data);
    }

    function handleNewRegisterForm(data){
        console.log('dataoncar: '+JSON.stringify(dataOnCar));

        setRegisterForm(data)
    }

    function handleNewContact(data) {
        console.log('dataoncar: '+JSON.stringify(dataOnCar));
        setContactForm(data);
    }

    function handleEmail(data) {
        console.log('dataoncar: '+JSON.stringify(dataOnCar));

        setEmailVal(data);
    }

    return (
        <div className="center">
            {visibleItem === "login" &&
                <form>
                    <h1>PCN Checker</h1>
                    <Login_Img item={visibleItem} onDataChange={handleVisChange}/>
                    <input onChange={handleChange}
                           type="email"
                           text={loginForm.username}
                           name="username"
                           placeholder="Username"
                           value={loginForm.username}/>
                    <input onChange={handleChange}
                           type="password"
                           text={loginForm.password}
                           name="password"
                           placeholder="Password"
                           value={loginForm.password}/>
                    <div className="form-group">
                        <button id="formbutton" onClick={logMeIn}>Submit</button>
                    </div>
                </form>
            }
            {visibleItem === "pcninput" &&
                <div>
                    <LoginButton onDataChange={handleVisChange} />
                    <PCNInputOld item={visibleItem} newData={handleAxiosData} carData={handleVehicData} onDataChange={handleVisChange}/>
                </div>
            }
            {visibleItem === "postsubmit" &&
                <div>
                    <LoginButton onDataChange={handleVisChange} />
                    <PostsubmitOld item={visibleItem} infovals={dataUpdate} onDataChange={handleVisChange}/>
                </div>
            }
            {
                visibleItem === "reminder" &&
                <div>
                    <LoginButton onDataChange={handleVisChange} />
                    <VehicleReminder item={visibleItem} onDataChange={handleVisChange}/>
                </div>
            }
            {visibleItem === "email" &&
                <div>
                    <LoginButton onDataChange={handleVisChange} />
                    <EmailInput item={visibleItem}   onDataChange={handleVisChange} setOnEmail={handleEmail} />
                </div>
            }
            {visibleItem === "mobile" &&
                <div>
                    <LoginButton onDataChange={handleVisChange} />
                    <TextInput item={visibleItem} onDataChange={handleVisChange} setOnMobile={handleMobile} />
                </div>
            }
            {visibleItem === "summary" &&
                <div>
                    <LoginButton onDataChange={handleVisChange} />
                    <SummaryPage item={visibleItem} infoVals={dataUpdate} mobVal={mobileVal} emVal={emailVal} onDataChange={handleVisChange} />
                </div>
            }
            {visibleItem === "registernew" &&
                <div>
                    <LoginButton onDataChange={handleVisChange} />
                    <RegisterNew item={visibleItem} onDataChange={handleVisChange} setOnRegister={handleNewRegisterForm}
                                 setVim={handleVim} setOnContact={handleNewContact} />
                </div>
            }


            {/*{visibleItem === "register" &&*/}
            {/*    <div>*/}
            {/*        <button onClick={() => setVisibleItem("login")}>*/}
            {/*            Login*/}
            {/*        </button>*/}
            {/*        <h1>Username & Password</h1>*/}
            {/*        <User_Pass_img/>*/}
            {/*        <User_Pass item={visibleItem} onDataChange={handleVisChange}/>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{visibleItem === "cardetails" &&*/}
            {/*    <div>*/}
            {/*        <button onClick={() => setVisibleItem("login")}>*/}
            {/*            Login*/}
            {/*        </button>*/}
            {/*        <h1>Car Details</h1>*/}
            {/*        <CarImg />*/}
            {/*        <CarInput item={visibleItem} onDataChange={handleVisChange}/>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{visibleItem === "contacts" &&*/}
            {/*    <div>*/}
            {/*        <button onClick={() => setVisibleItem("login")}>*/}
            {/*            Login*/}
            {/*        </button>*/}
            {/*        <h1>Contact Preferences</h1>*/}
            {/*        <ContImg />*/}
            {/*        <ContactInput item={visibleItem} onDataChange={handleVisChange}/>*/}
            {/*    </div>*/}
            {/*}*/}
            {visibleItem === "payment" &&
                <div>
                    <button onClick={() => setVisibleItem("login")}>
                        Login
                    </button>
                    <h1>Payment </h1>
                    <StripeImg />
                    <StripeApp item={visibleItem} regForm={registerForm} contForm={contactForm}
                               dataVals={dataUpdate} onDataChange={handleVisChange}/>
                </div>
            }

        </div>
    );
}

export default LoginToken;