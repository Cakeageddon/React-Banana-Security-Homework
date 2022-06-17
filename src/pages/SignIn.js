import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";


function SignIn() {
    const {inlogFunction} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();

    async function inlogData(data) {
        console.log(data)
        try {
            const result = await axios.post('http://localhost:3000/login', {
                    email: data.email,
                    password: data.wachtwoord,
                }
            )
            inlogFunction(result.data.accessToken)
        } catch
            (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(inlogData)}>
                <label htmlFor="form-email">
                    Email:
                    <input
                        type="text"
                        id="form-email"
                        {...register("email")}
                    />
                </label>
                <label htmlFor="form-wachtwoord">
                    Wachtwoord:
                    <input
                        type="text"
                        id="form-wachtwoord"
                        {...register("wachtwoord")}
                    />
                </label>
                <button
                    type="submit"
                >Inloggen
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;