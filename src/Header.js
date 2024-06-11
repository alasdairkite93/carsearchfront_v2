import axios from "axios";

function Header(props) {

    function logMeOut() {
        console.log('header log me out')
        axios({
            method: "POST",
            url:"http://127.0.0.1:4242/logout",
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