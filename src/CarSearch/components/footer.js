import React from 'react';
import '../Stylesheets/header/header.css';
import '../Stylesheets/layout/centre.css';
import '../Stylesheets/centre/centrestyles.css';
import '../Stylesheets/footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {

    return(
        <div className="footer">
            <div className="middle-element">
                <div style={{paddingBottom: "100px"}} className="two">
                    <div className="footercontainer">
                        <Link id="footlinks">Cookies</Link>
                        <Link id="footlinks">Terms and conditions</Link>
                        <Link id="footlinks">Privacy notice</Link>
                    </div>
                    <p style={{color: "#808080"}}>Copyright &copy; pcn.co.uk written by Alasdair Kite trading as OnlineWebServices</p>
                </div>
            </div>
        </div>
    )

}