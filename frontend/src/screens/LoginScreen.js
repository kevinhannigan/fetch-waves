import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import md5 from 'md5';



const LoginScreen = (props) => {
    const [user, setUser] = useState(undefined)
    const [failedLogin, setFailedLogin] = useState(undefined)
    const [failedRegister, setFailedRegister] = useState('')
    const [logInAttempt, setLogInAttempt] = useState('')
    const [passwordAttempt, setPasswordAttempt] = useState('')
    const [registerLogInAttempt, setRegisterLogInAttempt] = useState('')
    const [registerPasswordAttempt, setRegisterPasswordAttempt] = useState('')
    const [passwordVerifyAttempt, setPasswordVerifyAttempt] = useState('')
    const [landing, setLanding] = useState('login')

    const handleLogin = (e) => {
        e.preventDefault();
        let encryptedPw = md5(passwordAttempt)
        axios.post('/api/users/admin/login', {
            login_name: logInAttempt,
            password: encryptedPw
        })
            .then(response => {
                //message 200
                let user = response.data.login_name
                props.changeLoggedIn(user)
                setUser(user)
                window.history.back()
            })
            .catch(err => {
                setFailedLogin(err.response.data)
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (
            registerPasswordAttempt !== passwordVerifyAttempt
        ) {
            setFailedRegister("Passwords don't match");
            return;
        }
        let registerEncryptedPw = md5(registerPasswordAttempt)
        axios.post("/api/users/admin/new", {
            login_name: registerLogInAttempt,
            password: registerEncryptedPw,
        })
            .then(response => {
                setFailedRegister("");
                let user = response.data.login_name;
                props.changeLoggedIn(user);
                window.history.back()
            })
            .catch(err => {
                setFailedRegister(err.response.data);
            })
    };

    return (
        <div className="detail-container">
            {landing === 'login' ? (
                <h1>
                    Login
                </h1>) : (
                    <h1>
                        Register
                    </h1>
                )}
            {landing === 'login' ? (
                <div>
                    {user}
                    {failedLogin ? <Alert variant={'danger'}>{failedLogin}</Alert> : ''}
                    <Form onSubmit={handleLogin}>
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
                        <Button className='btn-primary' type="submit">Login</Button>
                    </Form>

                    <h4 className='py-3'>New to Fetch Waves?</h4>
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
                        {failedRegister ? <Alert variant={'danger'}>{failedRegister}</Alert> : ''}
                        <Form onSubmit={handleRegister}>
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
                            <Button className='btn-primary' type="submit">Register</Button>
                        </Form>
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
