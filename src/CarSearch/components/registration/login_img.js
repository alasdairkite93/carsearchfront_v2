

export default function Login_Img(visItem) {

    function registerMe() {
        visItem.onDataChange("pcninput");
    }

    function logMeIn() {
        visItem.onDataChange('login');
    }

    return (
        <div>
            <p>PCN Checker is the only way to receive a payment reminder for when a payment on a vehicle is due.</p>
            <h3><button id="formbutton" onClick={registerMe}>Click Me</button> to sign up today and never miss a parking payment again.</h3>
        </div>
    )

}