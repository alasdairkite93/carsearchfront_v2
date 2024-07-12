import {useNavigate} from "react-router-dom";
import {useState} from "react";


export default function RegisterNew(visitem) {

    const nav = useNavigate();

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: ""
    })

    const [contactForm, setContactForm] = useState({
        email: "",
        mobile: "",
        preference: ""
    })

    function registerMe(event) {


        //Will set local storage values to the form here
        localStorage.setItem("username", registerForm.username)
        localStorage.setItem("password", registerForm.password)

        event.preventDefault();

        localStorage.setItem('email', contactForm.email);
        localStorage.setItem('mobile', contactForm.mobile);
        localStorage.setItem('pref', 'MOBILE');

        visitem.setOnRegister(registerForm);
        visitem.setOnContact(contactForm);
        visitem.onDataChange("payment");

    }

    function handleChange(event) {

        const {value, name} = event.target
        setContactForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    function handleRegisterChange(event) {

        const {value, name} = event.target
        setRegisterForm(prevNote => ({
            ...prevNote, [name]: value
        }))


    }


    return (

        <form>
            <label id="labelreg" htmlFor="email">Email:</label>
            <input
                onChange={handleChange}
                type="text"
                name="email"
                text={contactForm.email}
                value={contactForm.email} required/>
            <label id="labelreg" >Mobile:</label>
            <input onChange={handleChange} name="mobile" type="text"
                   text={contactForm.mobile} value={contactForm.mobile} required/>
            <label id="labelreg">Preferred method of contact:</label>
            <select name="preference" id="selcont" onChange={handleChange}>
                <option value="1" selected>Mobile</option>
                <option value="2">Email</option>
            </select>
            <label id="labelreg">Username:</label>
            <input onChange={handleRegisterChange} name="username" type="text"
                   text={registerForm.username} value={registerForm.username} required/>
            <label id="labelreg">Password:</label>
            <input onChange={handleRegisterChange} name="password" type="text"
                   text={registerForm.password} value={registerForm.password} required/>
            <div class="form-group">
                <button id="regbut" onClick={registerMe}>Submit</button>
            </div>
        </form>

    )

}