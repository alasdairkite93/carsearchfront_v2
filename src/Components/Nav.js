import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {


    return (
        <>
        <nav>
            <ul>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><Link to="/showall">Dashboard</Link></li>
                <li><Link to="/home">Car Search</Link></li>
            </ul>
        </nav>
        </>
    )

}