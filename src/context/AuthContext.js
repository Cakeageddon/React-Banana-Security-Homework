import React, {createContext, useEffect, useState} from 'react';
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

    useEffect(() => {
        console.log("Context wordt gerefresht!")
        const token = localStorage.getItem('token')

        if (token) {
            async function getUserData() {
                const decode = jwtDecode(token);

                try {
                    const response = await axios.get(`http://localhost:3000/600/users/${decode.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    console.log(response)
                    toggleIsAuth({
                        isAuth: true,
                        status: 'done',
                        user: {
                            username: response.data.username,
                            email: response.data.email,
                            id: response.data.id,
                        }
                    })

                } catch (e) {
                    toggleIsAuth({
                        ...isAuth,
                        status: 'error'
                    })
                    console.error(e);
                }
            }

            getUserData();
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            })
            localStorage.clear()
        }
    }, []);

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
                status: 'done',
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
            status: 'done'
        })
        localStorage.clear()
        history.push('/')
    }


    const data = {
        ingelogd: isAuth.isAuth,
        inlogFunction: inloggen,
        uitlogFunction: uitloggen,
        user: isAuth.user
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider