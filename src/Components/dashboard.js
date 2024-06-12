
import React, {useState} from "react";
import axios from "axios";
import {renderurl} from "../CarSearch/components/globalvar";
export default function Dashboard(props) {


    const [usersData, setUsersData] = useState('')

    function getData() {
        axios({
            method: "GET",
            url: renderurl+"/showusers",
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