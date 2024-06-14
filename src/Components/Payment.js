import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {renderurl} from "../CarSearch/components/globalvar";

const Message = ({message}) => (
    <section>
        <p>{message}</p>
    </section>
);


const SuccessDisplay = ({sessionId}) => {

    return (
        //propose that on success you could do the business logic
        //You may wish to ask customers to add their details before clicking the link
        <section>
            <h1>Success Display</h1>

            <div className="product Box-root">
                <Logo/>
                <div className="description Box-root">
                    <h3>Subscription to starter plan successful!</h3>
                </div>
            </div>
            {/*<form action="http://127.0.0.1:4242/create-portal-session" method="POST">*/}
                <form action={renderurl+"/create-portal-session"} method="POST">

                <input
                    type="hidden"
                    id="session-id"
                    name="session_id"
                    value={sessionId}
                />
                <input
                    type="hidden"
                    id="username"
                    name="username"
                    value={localStorage.getItem('username')}
                />
                <button id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </button>
            </form>
        </section>
    );
};


export default function Payment(props) {

    const [visibleItem, setVisibleItem] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    const [confirmation, setConfirmation] = useState('')

    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');
    let [cusId, setCusID] = useState('');

    const navigate = useNavigate();

    function createCustomer() {

        axios({
            method: "POST",
            // url: 'http://127.0.0.1:4242/create_customer',
            url: renderurl+'/create_customer',
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username')
            }
        }).then((response) => {
            const res = response.data
            res.access_token && props.setToken(res.access_token)
            switch (response.data.status) {
                case 200:
                    console.log('Response: ' + JSON.stringify(response.data));
                    setCusID(response.data.cus_id);
                    break;
                case 400:
                    setErrorMessage('User already exists');
                    break;
                case 500:
                    setErrorMessage('Details not accepted');
                    break;
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    const ProductDisplay = (info) => (

        //I could add customer details on submit
        <section>
            <div className="product">
                <Logo/>
                <div className="description">
                    <h3>Starter plan</h3>
                    <h5>$3.00 / month</h5>
                </div>
            </div>
            {/*<form action="http://127.0.0.1:4242/create-checkout-session" method="POST">*/}
            <form action={renderurl+"/create-checkout-session"} method="POST">
            <input type="hidden" name="lookup_key" value="price_1PCnGm2LoquNKfKzB9UtPY2K"/>
                <input type="hidden" name="username" value={localStorage.getItem('username')}/>
                <input type="hidden" name="sessionid" value={localStorage.getItem('session_id')}/>
                <button onClick={createCustomer} id="checkout-and-portal-button" type="submit">
                    Checkout
                </button>
            </form>
        </section>
    );

    function cancelSubscription() {

        axios({
            method: "POST",
            // url: 'http://127.0.0.1:4242/cancel_payment',
            url: renderurl+'/cancel_payment',
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username'),
            }
        }).then((response) => {
            console.log('canceled subscription response: ' + JSON.stringify(response));
            setConfirmation('Subscription Cancelled');
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

    }

    useEffect(() => {
        axios({
            method: "POST",
            // url: 'http://127.0.0.1:4242/getPaid',
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
            setVisibleItem(pay_status);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }, []);

    function addPaymentToDB() {

        axios({
            method: "POST",
            // url: 'http://127.0.0.1:4242/update_payment',
            url: renderurl+'/update_payment',
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                username: localStorage.getItem('username'),
                sessionid: sessionId
            }
        }).then(() => {
            console.log('Payment added to database.');
            setVisibleItem('PAID')
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    };

    const PaidDisplay = () => {

        //This is where I show the cancel button

        return (
            <div>
                <p>You've already made payment</p>
                <p>To cancel your subscription: </p>
                <button onClick={cancelSubscription}>Click me</button>
                <p>{confirmation}</p>
            </div>
        )
    }

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        //may need this query for session
        if (query.get('success')) {
            console.log('QUERY SUCCES: ' + query)
            setSuccess(true);
            setSessionId(query.get('session_id'));
        }

        if (query.get('canceled')) {
            setSuccess(false);
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, [sessionId]);

        console.log(typeof visibleItem)
        if (visibleItem === true) {
            return <PaidDisplay/>;
        }
        else if (visibleItem === false) {
            if (!success && message === '') {
                return <ProductDisplay/>;
            } else if (success && sessionId !== '') {
                //propose adding customer details to DB here
                // addPaymentToDB();
                addPaymentToDB();
                return <SuccessDisplay sessionId={sessionId} cusId={cusId}/>;
            } else {
                //propose deleting details here
                return <Message message={message}/>;
            }
        }

}

const Logo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="14px"
        height="16px"
        viewBox="0 0 14 16"
        version="1.1"
    >
        <defs/>
        <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
                id="0-Default"
                transform="translate(-121.000000, -40.000000)"
                fill="#E184DF"
            >
                <path
                    d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
                    id="Pilcrow"
                />
            </g>
        </g>
    </svg>
)