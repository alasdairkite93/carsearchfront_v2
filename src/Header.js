import axios from "axios";
import {renderurl} from "./CarSearch/components/globalvar";

function Header(props) {

    function logMeOut() {
        console.log('header log me out')
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
        })}

    return(
        <header className="App-header">
            <button onClick={logMeOut}>
                Logout
            </button>
        </header>
    )
}

export default Header;