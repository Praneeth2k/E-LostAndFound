import React from "react";
import LoginForm from "./LoginForm";
import {useLocation} from 'react-router-dom'
function LoginComponent(){
    const location = useLocation()
    return (
        <div>
            <LoginForm />
        </div>
    )
} 

export default LoginComponent;