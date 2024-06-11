import {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function LoginToken(props) {


    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [username, setUsername] = useState('');
    const [usernameValid, setUserNameValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [submitError, setSubmitError] = useState('');

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
            url: "http://127.0.0.1:4242/token",
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
                    url: 'http://127.0.0.1:4242/register',
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



    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };



    const handleEmailChange = (e) => {

        const emailval = e.target.value;

        setEmail(emailval);
        if (!isEmailValid(emailval)) {
            setEmailError('Invalid email format.');
        } else {
            setEmailError('');
        }

    };
    function handleChange(event) {
        const {value, name} = event.target
        setloginForm(prevNote => ({
                ...prevNote, [name]: value
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailError) {
            // Submit form
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {visibleItem == "login" &&
                <form className="login">
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
            <button onClick={() => setVisibleItem("register")}>
                Register
            </button>
            <button onClick={() => setVisibleItem("login")}>
                Login
            </button>
            {visibleItem == "register" &&
                <form>
                    <p>You need to create an account before using this service</p>
                    <label htmlFor="username">Username:</label>
                    <input onChange={handleRegisterChange} text={registerForm.username} type="text" name="username"
                           value={registerForm.username} required/>
                    <label htmlFor="password">Password:</label>
                    <input onChange={handleRegisterChange} text={registerForm.password} type="password" name="password"
                           value={registerForm.password} required minLength="6" maxLength="20"/>
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleRegisterChange} text={registerForm.email} type="email" name="email"
                           value={registerForm.email} required/>
                    {emailError && <p>{emailError}</p>}
                    <button onClick={registerMe}>Submit</button>
                    <p>{errorMessage}</p>
                    <p>{submitError}</p>
                </form>
            }
        </div>
    );
}

export default LoginToken;