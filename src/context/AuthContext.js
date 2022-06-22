import React, {createContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    function inloggen(jwt) {
        const decode = jwtDecode(jwt)
        getData(decode.sub, jwt)
        localStorage.setItem('token', jwt)
    }

    async function getData(id, token) {
        try {
            const data = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                }
            })
            history.push('/profile')
        } catch (e) {
            console.error(e)
        }
    }

    function uitloggen() {
        toggleIsAuth({
            isAuth: false,
            user: null,
        })
        localStorage.clear()
        history.push('/')
    }


    const data = {
        ingelogd: isAuth.isAuth,
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