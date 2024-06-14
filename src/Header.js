import axios from "axios";
import {renderurl} from "./CarSearch/components/globalvar";
import {useNavigate} from "react-router-dom";

function Header(props) {

    const navigate = useNavigate();

    function logMeOut() {
        console.log('header log me out')
        axios({
            method: "POST",
            url: renderurl+"/logout",
        })
            .then(() => {
                localStorage.clear();
                props.token();
                navigate('/');
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