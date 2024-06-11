
import React, {useState} from "react";
import axios from "axios";

export default function Dashboard(props) {


    const [usersData, setUsersData] = useState('')

    function getData() {
        axios({
            method: "GET",
            url:"http://127.0.0.1:4242/showusers",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then((response) => {
                const res =response.data
                res.access_token && props.setToken(res.access_token)
                console.log(response.data);
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
        }

    return (
        <>
            <p>To get the database: </p><button onClick={getData}>Click me</button>
            <div>
                <ul>{usersData}</ul>
            </div>
        </>
    )
}