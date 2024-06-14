
import {Outlet, useNavigate} from "react-router-dom";

import logMeOut from "./LogMeOut";
import axios from "axios";
import {useEffect, useState} from "react";
import {renderurl} from "../CarSearch/components/globalvar";
function PrivatePaymentRoute(props) {


    const [payStatus, setPayStatus] = useState();
    const navigate = useNavigate();

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
            if (pay_status === true) {
                // console.log('pay status is true: '+pay_status)
                return <Outlet />
            }
            else {
                console.log('navigate toL '+"http://localhost:3000/payment")
                navigate("/payment");
            }
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



    if (payStatus === true) {
        console.log('pay status is true: '+payStatus)
        return <Outlet />
    }
    else {
        console.log('navigate toL '+"http://localhost:3000/payment")
        navigate("/payment");
    }

}

export default PrivatePaymentRoute