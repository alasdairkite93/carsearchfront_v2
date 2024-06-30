import {useEffect, useState} from 'react';
import axios from "axios";
import {renderurl} from "./CarSearch/components/globalvar";

import User_Pass_img from "./CarSearch/components/registration/user_pass_img";
import User_Pass from "./CarSearch/components/registration/user_pass";

import CarInput from "./CarSearch/components/registration/carinput";

import ContactInput from "./CarSearch/components/registration/ContactInput";

import PaymentPage from "./CarSearch/components/registration/payment";

import StripeApp from "./CarSearch/components/stripeComponents/StripeApp";

import './signup.css';

function LoginToken(props) {


    const [emailError, setEmailError] = useState('');

    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [visibleItem, setVisibleItem] = useState('login');
    const [errorMessage, setErrorMessage] = useState('');

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



    function registerMe(event) {

            const email_bool = checkEmail(registerForm.email);

            if (email_bool === true) {

                axios({
                    method: "POST",
                    url: renderurl+'/register',
                    // url: "http://127.0.0.1:4242/token",
                    data: {
                        username: registerForm.username,
                        password: registerForm.password,
                        email: registerForm.email
                    }
                }).then(r => {
                    console.log("Data: " + JSON.stringify(r.data) + " url: " + r.data.url);
                    switch (r.data.status) {
                        case 200:
                            setVisibleItem('login');
                            break;
                        case 400:
                            setErrorMessage('User already exists');
                            break;
                        case 500:
                            setErrorMessage('Details not accepted');
                            break;
                        default:
                            setErrorMessage('');
                    }
                })

                setRegisterForm(({
                    username: "",
                    password: "",
                    email: ""
                }))
            }
            else {
                setEmailError('Invalid email format.');
            }

            event.preventDefault();

    }

    function handleRegisterChange(event) {

        const {value, name} = event.target
        setRegisterForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    //propose using effect of where payment is successful using the success url then adding
    //details to the database here
    useEffect(() => {

        let href = window.location.href;
        let bool_href = href.includes("success");

        const querystring = window.location.search;
        console.log('querystring Long: '+querystring);

        const urlparams = new URLSearchParams(querystring);
        console.log('urlparams log: '+urlparams);

        const sessionid = urlparams.get('session_id');
        console.log('sessionid: '+sessionid);

        if (bool_href) {

            //have to extract the sessionID parameter from the URL

            let pcn1 = localStorage.getItem('pcn1');
            let vim1 = localStorage.getItem('vim1');
            let twocars = 1
            let pcn2 = '';
            let vim2 = '';

            if (localStorage.getItem('pcn2')) {

                pcn2 = localStorage.getItem('pcn2');
                vim2 = localStorage.getItem('vim2');
                twocars = 2
            }



            let username = localStorage.getItem('username');
            let password = localStorage.getItem('password');

            let email = localStorage.getItem('email');
            let mobile = localStorage.getItem('mobile');
            let preference = localStorage.getItem('preference');

            //Remeber to add num cars to request
            axios({
                method: "POST",
                url:renderurl+"/addnewuser",
                data: {
                    username: username,
                    password: password,
                    pcn1: pcn1,
                    vim1: vim1,
                    twocars: twocars,
                    email: email,
                    mobile: mobile,
                    preferences: preference,
                    pcn2: pcn2,
                    vim2: vim2,
                    session_id: sessionid
                }
            }).then((response) => {
                console.log('addnewuser response: '+JSON.stringify(response));
            })

        }

        localStorage.clear();

    }, []);


    function handleChange(event) {
        const {value, name} = event.target
        setloginForm(prevNote => ({
                ...prevNote, [name]: value
            })
        )
    }

    function handleVisChange(data) {
        console.log('handlevischange data: '+data);
        setVisibleItem(data);
    }

    return (
        <div className="center">
            <button onClick={() => setVisibleItem("login")}>
                Login
            </button>
            {visibleItem === "login" &&
                <form className="login">
                    <button onClick={() => setVisibleItem("register")}>
                        Register
                    </button>
                    <h1>Login</h1>
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
                    <button onClick={logMeIn}>Submit</button>
                </form>
            }


            {visibleItem === "register" &&
                <div>

                    <h1>Login Information</h1>
                    <User_Pass_img/>
                    <User_Pass item={visibleItem} onDataChange={handleVisChange}/>
                </div>
            }
            {visibleItem === "cardetails" &&
                <div>

                    <h1>Car Details</h1>
                    <CarInput item={visibleItem} onDataChange={handleVisChange}/>
                </div>
            }
            {visibleItem === "contacts" &&
                <div>

                    <h1>Contact Details</h1>
                    <ContactInput item={visibleItem} onDataChange={handleVisChange}/>
                </div>
            }
            {visibleItem === "payment" &&
                <div>

                    <h1>Payment Details</h1>
                    <StripeApp item={visibleItem} onDataChange={handleVisChange}/>
                </div>
            }
                {/*<form>*/}
                {/*    <p>You need to create an account before using this service</p>*/}
                {/*    <label htmlFor="username">Username:</label>*/}
                {/*    <input onChange={handleRegisterChange} text={registerForm.username} type="text" name="username"*/}
                {/*           value={registerForm.username} required/>*/}
                {/*    <label htmlFor="password">Password:</label>*/}
                {/*    <input onChange={handleRegisterChange} text={registerForm.password} type="password" name="password"*/}
                {/*           value={registerForm.password} required minLength="6" maxLength="20"/>*/}
                {/*    <label htmlFor="email">Email:</label>*/}
                {/*    <input onChange={handleRegisterChange} text={registerForm.email} type="email" name="email"*/}
                {/*           value={registerForm.email} required/>*/}
                {/*    {emailError && <p>{emailError}</p>}*/}
                {/*    <button onClick={registerMe}>Submit</button>*/}
                {/*    <p>{errorMessage}</p>*/}
                {/*</form>*/}

        </div>
    );
}

export default LoginToken;