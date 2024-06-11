import { useState } from 'react'
import axios from "axios";
function Profile(props) {

    const [profileData, setProfileData] = useState(null)
    function getData() {
        axios({
            method: "POST",
            url:"http://127.0.0.1:4242/profile",
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username')
            }
        })
            .then((response) => {
                const res =response.data
                setProfileData(({
                    username: res[0][0][0],
                    email: res[0][0][1],
                    payment: res[0][1][0]
                }))
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(typeof error.response.status)
                console.log(error.response.headers)
            }
        })}


    return (
        <div className="Profile">

            <p>To get your profile details: </p><button onClick={getData}>Click me</button>
            {profileData && <div>
                <p>Profile username: {profileData.username}</p>
                <p>Email: {profileData.email}</p>
                <p>Payment: {profileData.payment}</p>
            </div>
            }

        </div>
    );
}

export default Profile;