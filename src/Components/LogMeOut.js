import axios from "axios";


const logMeOut = (props) => {
    axios({
        method: "POST",
        url: "http://127.0.0.1:4242/logout",
    })
        .then((response) => {
            localStorage.clear();
            props.token()
            window.location.reload();
        }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    })
}

export default logMeOut;