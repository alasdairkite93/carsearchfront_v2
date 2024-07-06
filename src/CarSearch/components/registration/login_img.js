

export default function Login_Img(visItem) {

    function registerMe() {
        visItem.onDataChange("register");
    }

    return (
        <div>
            <p>PCN Checker is the only way to receive a payment reminder for when a payment on a vehicle is due.</p>
            <p>Either login or <button onClick={registerMe}> sign up </button> today and never miss a payment again.</p>
        </div>
    )

}