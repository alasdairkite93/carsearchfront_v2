import { useState } from 'react'
import axios from "axios";
import {renderurl} from "./CarSearch/components/globalvar";
import Header from "./Header";
import logMeOut from "./Components/LogMeOut";

function Profile(props) {

    const [profileData, setProfileData] = useState(null)
    function getData() {
        axios({
            method: "POST",
            url:renderurl+"/profile",
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username')
            }
        })
            .then((response) => {
                console.log('PROFILE RESPONSE: '+JSON.stringify(response.data));
                console.log('Stripe: '+JSON.stringify(response.data.stripe));
                const res =response.data
                console.log('email: '+res.user[0].email)
                setProfileData(({
                    username: res[0][0][0],
                    email: res.user[0].email,
                    numberofcars: res[0][0][2],
                    payment: response.stripe.payment
                }))
            }).catch((error) => {
                console.log('error '+error);
        })}


    return (
        <div className="Profile">

            <p>To get your profile details: </p><button onClick={getData}>Click me</button>
            {profileData && <div>
                <p>Profile username: {profileData.username}</p>
                <p>Email: {profileData.email}</p>
                <p>Payment: {profileData.payment}</p>
                <p>Number of cars registered: {profileData.numberofcars}</p>
            </div>
            }

        </div>
    );
}

export default Profile;