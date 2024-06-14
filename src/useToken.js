
import Header from "./Header";
import {useEffect, useState} from 'react';
import logMeOut from "./Components/LogMeOut";

function useToken() {

    function getToken() {
        const userToken = localStorage.getItem('token');
        console.log('get token method: '+userToken);
        if (userToken === null)
        {
            logMeOut();
        }
        return userToken && userToken
    }

    const [token, setToken] = useState(getToken());


    function saveToken(userToken) {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken
    }

}

export default useToken;