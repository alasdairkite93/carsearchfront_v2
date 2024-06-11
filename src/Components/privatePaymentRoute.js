
import {Outlet, useNavigate} from "react-router-dom";

import logMeOut from "./LogMeOut";
import axios from "axios";
import {useEffect, useState} from "react";

function PrivatePaymentRoute(props) {


    const [payStatus, setPayStatus] = useState();
    useEffect(() => {

        console.log(localStorage.getItem('username'));
        axios({
            method: "POST",
            url: 'http://127.0.0.1:4242/payment_status',
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username')
            }
        }).then((response) => {
            console.log('UPDATED Payment '+response.data.status);
            setPayStatus(response.data.status);
            // setPay(JSON.stringify(response.data.status));
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                if (error.response.status == 401) {
                    logMeOut(props)
                }
            }})
    }, []);

    const navigate = useNavigate();

    if (payStatus == true) {
        return <Outlet />
    }
    else {
        navigate("/payment");
    }

}

export default PrivatePaymentRoute