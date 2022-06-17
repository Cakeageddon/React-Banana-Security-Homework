import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

function SignUp() {
    const {register, handleSubmit} = useForm();

    const history = useHistory()

    async function onFormSubmit(data) {
        console.log(data)
        try {
            await axios.post('http://localhost:3000/register', {
                    email: data.email,
                    password: data.wachtwoord,
                    username: data.gebruikersnaam,
                }
            )
            history.push('/signin')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={handleSubmit(onFormSubmit)}>
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
                <label htmlFor="form-gebruikersnaam">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="form-gebruikersnaam"
                        {...register("gebruikersnaam")}
                    />
                </label>
                <button
                    type="submit"
                >Registreren
                </button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;