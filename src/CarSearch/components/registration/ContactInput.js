import {useEffect, useState} from "react";


export default function ContactInput(visitem){

    const [contactForm, setContactForm] = useState({
        email: "",
        mobile: "",
        preference: ""
    })

    useEffect(() => {

        for (var i = 0; i < localStorage.length; i++){
            console.log('contact storage: '+localStorage.getItem(localStorage.key(i)));
        }

    }, []);

    function handleChange(event) {

        const {value, name} = event.target
        setContactForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    function submitChange(event){

        event.preventDefault();

        localStorage.setItem("email", contactForm.email);
        localStorage.setItem("mobile", contactForm.mobile);
        localStorage.setItem("preference", contactForm.preference);


        visitem.onDataChange("payment")
        console.log("CONTACT FORM: "+contactForm);

    }

    return (

        <div>
            <p>{localStorage.getItem('pcn1')}</p>
            <p>Contact Input</p>
            <form>
                <label id="labelreg" htmlFor="email">Email:</label>
                <input onChange={handleChange} type="text" name="email"
                       text={contactForm.email} value={contactForm.email} required/>
                <label id="labelreg" >Mobile:</label>
                <input onChange={handleChange} name="mobile" type="text"
                       text={contactForm.mobile} value={contactForm.mobile} required/>
                <input type="radio" value="mobile" name="preference" onChange={handleChange} />
                <label >Prefer Mobile</label>
                <input type="radio" value="email" name="preference" onChange={handleChange} />
                <label >Prefer Email</label>
                <div className="form-group">
                    <button id="regbut" onClick={submitChange}>Submit</button>
                </div>
            </form>
        </div>
    )
}