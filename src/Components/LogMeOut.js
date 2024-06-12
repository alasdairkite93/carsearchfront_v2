import axios from "axios";
import {renderurl} from "../CarSearch/components/globalvar";

const logMeOut = (props) => {
    axios({
        method: "POST",
        url: renderurl+"/logout",
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