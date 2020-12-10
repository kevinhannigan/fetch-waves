import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';



const LoginScreen = (props) => {
    const [user, setUser] = useState(undefined)
    const [failedLogin, setFailedLogin] = useState('')
    const [logInAttempt, setLogInAttempt] = useState('')
    const [passwordAttempt, setPasswordAttempt] = useState('')
    const [registerLogInAttempt, setRegisterLogInAttempt] = useState('')
    const [registerPasswordAttempt, setRegisterPasswordAttempt] = useState('')
    const [passwordVerifyAttempt, setPasswordVerifyAttempt] = useState('')
    const [landing, setLanding] = useState('login')

    const handleLogin = () => {
        axios.post('/api/users/admin/login', {
            login_name: logInAttempt,
            password: passwordAttempt
          })
          .then(response => {
            //message 200
            let user = response.data
            props.changeLoggedIn(user)
            setUser(user)
            setFailedLogin('Success')
          })
          .catch(err => {
            setFailedLogin(err);
          });
      };
    
    const handleRegister = () => {
        console.log("Registering...")
    }    

    return (
        <div>
            {landing === 'login' ? (
            <h1>
                Login
            </h1> ) : (
            <h1>
                Register
            </h1>
            )}
            {landing === 'login' ? (
                <div>
                    {user}
                    <form onSubmit={handleLogin}>
                        {failedLogin}
                    <Form>
                        <Form.Group controlId="loginUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="username" 
                                value={logInAttempt}
                                onChange={(event) => {
                                    const fieldValue = event.target.value
                                    setLogInAttempt(fieldValue)
                                }} />
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                value={passwordAttempt}
                                onChange={(event) => {
                                    const passwordValue = event.target.value
                                    setPasswordAttempt(passwordValue)
                                }} />
                        </Form.Group>
                    </Form>
                    <input type="submit" value="Login" />
                    </form>

                    <h4 className='py-3'>New to Fetch Waves suh?</h4>
                    <Button
                        className="loginSecondary"
                        variant="primary"
                        type="submit"
                        onClick={() => {
                            setLanding('register')
                        }}>
                        Sign Up
                    </Button>
                </div>
            ) : (
                    <div>
                        <form onSubmit={handleRegister}>
                        <Form>
                            <Form.Group controlId="registerUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="username"
                                    value={registerLogInAttempt}
                                    onChange={(event) => {
                                        const regLogInAttempt = event.target.value
                                        setRegisterLogInAttempt(regLogInAttempt)
                                }} />
                            </Form.Group>
                            <Form.Group controlId="registerPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    value={registerPasswordAttempt}
                                    onChange={(event) => {
                                        const regPasswordValue = event.target.value
                                        setRegisterPasswordAttempt(regPasswordValue)
                                }} />
                            </Form.Group>
                            <Form.Group controlId="confirmRegisterPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password" 
                                    placeholder="Confirm Password"
                                    value={passwordVerifyAttempt}
                                    onChange={(event) => {
                                        const confPasswordValue = event.target.value
                                        setPasswordVerifyAttempt(confPasswordValue)
                                }} />
                            </Form.Group>
                            <Button
                            variant="primary"
                            type="submit"
                            onClick={() => {
                                console.log('Register Pressed')
                            }}>
                            Register
                        </Button>
                        </Form>
                        </form>

                        <h4 className='py-3'>Already have an account?</h4>
                        <Button
                            className="loginSecondary"
                            variant="primary"
                            type="submit"
                            onClick={() => {
                                setLanding('login')
                            }}>
                            Login
                        </Button>
                    </div>
                )}
        </div>
    )
}

export default LoginScreen
