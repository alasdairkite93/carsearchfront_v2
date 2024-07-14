


export default function LoginButton(visItem) {

    function registerMe() {
        visItem.onDataChange("login");
    }

    function logMeIn() {
        visItem.onDataChange('login');
    }


    return (
        <div>
            <p>Have you remembered your login credentials?</p>
            <h3><button id="formbutton" onClick={registerMe}>Log In</button> </h3>
        </div>
    )

}