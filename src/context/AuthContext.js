import React, {createContext, useState} from 'react';
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    function inloggen() {
        toggleIsAuth(true)
        console.log("Gebruiker is ingelogd!")
        history.push('/profile')
    }

    function uitloggen() {
        toggleIsAuth(false)
        console.log("Gebruiker is uitgelogd!")
        history.push('/')
    }

    const data = {
        ingelogd: isAuth,
        inlogFunction: inloggen,
        uitlogFunction: uitloggen,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider