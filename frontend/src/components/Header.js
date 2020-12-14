import React from 'react'
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Button } from 'react-bootstrap'
import axios from 'axios';


const Header = (props) => {

    const handleLogOut = () => {
        axios.post('/api/users/admin/logout', {})
            .then(() => {
                props.changeLoggedIn(undefined)
            })
            .catch(err => console.log(err.response));
    };

    return (
        <header>
            <Navbar className="custom" bg="primary" variant="primary" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><i className="fas fa-water"></i> Fetch Waves</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
                {props?.current_user ? (
                    <div className="alignlogin">
                        <div className="loginname">{props?.current_user}</div>
                        <div className="logout">
                            <Button onClick={handleLogOut}>Log Out</Button>
                        </div>
                    </div>) : (
                        <Link className='btn btn-primary my-3 px-2' to='/login-register'> Login </Link>
                    )}
                </Container>        
            </Navbar>
        </header>
    )
}

export default Header
