import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (tokenString != null && tokenString != "undefined") {
            return tokenString;
        }
        return null
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        const token = JSON.stringify(userToken);
        if (userToken['accessToken']) {
            localStorage.setItem('token', userToken['accessToken']);
            localStorage.setItem('tokenType', userToken['tokenType']);
            setToken(userToken['accessToken']);
        } else {
            alert(token);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}