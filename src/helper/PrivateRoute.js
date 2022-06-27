import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({children, isAuth, ...rest}) {
    const {ingelogd} = useContext(AuthContext)

    return (
        <Route {...rest}>
            {ingelogd ? children : <Redirect to="/signin"/>}
        </Route>
    )
}

export default PrivateRoute