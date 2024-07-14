import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {renderurl} from "../CarSearch/components/globalvar";
import axios from "axios";

export default function RegisterNew(visitem) {

    const nav = useNavigate();

    const [message, setMessage] = useState();

    const [vimNumber, setVimNumber] = useState({
        vim: ""
    })

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: ""
    })

    const [contactForm, setContactForm] = useState({
        email: "",
        mobile: "",
        preference: ""
    })

    async function registerMe(event) {

        const res = await axios({
            method: "POST",
            url: renderurl + '/checkusername',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: registerForm.username,
            }
        }).then((response) => {
            console.log('This is the response: ' + JSON.stringify(response));
            console.log('this is the status: ' + response.data.status)
            if (response.data.status === 0) {

                console.log('this username does not exist')
                localStorage.setItem("username", registerForm.username)
                localStorage.setItem("password", registerForm.password)

                event.preventDefault();

                localStorage.setItem('email', contactForm.email);
                localStorage.setItem('mobile', contactForm.mobile);
                localStorage.setItem('pref', 'MOBILE');


                localStorage.setItem('vim', ' ');

                visitem.setVim(vimNumber);
                visitem.setOnRegister(registerForm);
                visitem.setOnContact(contactForm);
                visitem.onDataChange("payment");
            } else if (response.data.status === 1) {
                // visitem.onDataChange("registernew");
                setMessage('this usernmae exists')
                console.log('this username exists')
            }
        })
        console.log(res);
    }

    function handleVimChange(event) {

        setVimNumber(event.target);

    }

    function handleChange(event) {

        const {value, name} = event.target
        setContactForm(prevNote => ({
            ...prevNote, [name]: value
        }))

    }

    function handleRegisterChange(event) {

        //check if username exists

        const {value, name} = event.target
        setRegisterForm(prevNote => ({
            ...prevNote, [name]: value
        }))

    }


    return (

        <div className="middle-element">
            <div className="two">
                <label id="labelreg" htmlFor="email"><b>Email</b></label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="email"
                    id="inputbox"
                    text={contactForm.email}
                    value={contactForm.email} required/>
                <label id="labelreg"><b>Mobile</b></label>
                <input onChange={handleChange}
                       name="mobile"
                       type="text"
                       id="inputbox"
                       text={contactForm.mobile}
                       value={contactForm.mobile} required/>
                <label id="labelreg"><b>Contact Preference</b></label>
                <select name="preference" id="selcont" onChange={handleChange}>
                    <option value="1" selected>Mobile</option>
                    <option value="2">Email</option>
                </select>
                {/*<label id="labelreg"><b>VIM Number</b></label>*/}
                {/*<input onChange={handleVimChange}*/}
                {/*       name="vim"*/}
                {/*       type="text"*/}
                {/*       id="inputbox"*/}
                {/*       text={vimNumber.vim}*/}
                {/*       value={vimNumber.vim}*/}
                {/*       required/>*/}
                <p>{message}</p>
                <label id="labelreg"><b>Username</b></label>

                <input onChange={handleRegisterChange}
                       name="username"
                       type="text"
                       id="inputbox"
                       text={registerForm.username}
                       value={registerForm.username}
                       required/>
                <label id="labelreg"><b>Password</b></label>
                <input onChange={handleRegisterChange}
                       name="password"
                       type="text"
                       id="inputbox"
                       text={registerForm.password}
                       value={registerForm.password}
                       required/>
                <div class="form-group">
                    <button id="formbutton" onClick={registerMe}>Submit</button>
                </div>
            </div>
        </div>

    )

}