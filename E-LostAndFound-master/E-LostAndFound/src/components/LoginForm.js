import React, {useEffect, useState} from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import {Link, useHistory} from "react-router-dom";
import axios from "../axios";

import { connect } from 'react-redux'
import { login } from '../actions/authActions'

import "./loginForm.css"

import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';




function LoginForm(props){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState(null)
    const [name, setName] = useState(null)
    
    const history = useHistory()

    useEffect(()=>{
        const { error } = props
        if(error.id === 'LOGIN_FAIL'){
            setMsg(error.msg)
        }else {
            setMsg(null)
        }
        if(props.isAuthenticated){
            history.push("/")
        }
    })

    function handleChange(event){
        const { name, value } = event.target
        name == "email"? setEmail(value): setPassword(value)
    }
    
    function handleSubmit(event){
        event.preventDefault()
        
        const User = {
            email,
            password
        }
        // Attempt to login
        props.login(User)

        if(props.isAuthenticated){
            history.push("/")
        }
          
    }

    

    const responseGoogle = (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token
        console.log(id_token)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const body = JSON.stringify({ idtoken: id_token })
        axios.post("/googlelogin",{id_token}, config)
          .then(()=>console.log("Wuttt"))
          .catch(err => console.log(err))
    //     const User = {
    //         name:profile.givenName,
    //         email: profile.email,
    //         password: "default_google_password"
    //     }

        
    //     props.login(User)
    //   
    }

    const logout = () => {
        console.log("Just logged out")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                <div className = "form-container" >
                { msg? <Alert color="danger">{ msg }</Alert>: null}
                <Form className = "login-form">
                    <h2>Login</h2>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name = "email" onChange = {handleChange} value = {email}  placeholder="enter e-mail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name = "password" onChange = {handleChange} value = {password} placeholder="password" />
                    </FormGroup>
                    <Button color="success" onClick = {handleSubmit}>Log in</Button>
                    
                    <hr className="hr-text" dataContent="or connect with" />
                    <GoogleLogin
                        clientId="337044747904-ajjq5h0hp7ijobge2a8j6ulqachn52j5.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Form>
                {/* <GoogleLogout
                    clientId="337044747904-ajjq5h0hp7ijobge2a8j6ulqachn52j5.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    > 
                    </GoogleLogout>*/}
            
                </div>
                </div>
            </div>
    
        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps,{ login })(LoginForm)