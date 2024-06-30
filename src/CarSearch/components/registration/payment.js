import {useEffect} from "react";


export default function PaymentPage(){



    useEffect(() => {

        for (var i = 0; i < localStorage.length; i++){
            console.log('payment storage: '+localStorage.getItem(localStorage.key(i)));
        }

    }, []);

    return (
        <p>Payment page</p>
    )

}