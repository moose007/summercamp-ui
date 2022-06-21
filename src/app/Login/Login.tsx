import '@app/Login/login.css';
import PropTypes from 'prop-types';
import {LoginComponent} from "@app/Login/LoginComponent";
import React from "react";

async function loginUser(credentials) {
    return fetch(process.env["API_URL"] + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {

    return(
        <LoginComponent triggerRefresh={setToken} />
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}