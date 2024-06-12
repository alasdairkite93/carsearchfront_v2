
import {Outlet, useNavigate} from "react-router-dom";

import logMeOut from "./LogMeOut";
import axios from "axios";
import {useEffect, useState} from "react";
import {renderurl} from "../CarSearch/components/globalvar";
function PrivatePaymentRoute(props) {


    const [payStatus, setPayStatus] = useState(false);
    useEffect(() => {

        console.log(localStorage.getItem('username'));
        axios({
            method: "POST",
            url: renderurl+'/getPaid',
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username'),
            }
        }).then((response) => {
            console.log('Get PAID: ' + response.data.payment);
            const pay_status = response.data.payment;

            setPayStatus(pay_status);
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

    console.log('paystatus: '+payStatus);

    if (payStatus === true) {
        console.log('pay status is true: '+payStatus)
        return <Outlet />
    }
    else {
        console.log('navigate toL '+renderurl+"/payment")
        navigate("http://localhost:3000/payment");
    }

}

export default PrivatePaymentRoute