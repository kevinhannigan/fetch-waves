import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container} from 'react-bootstrap'


const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="primary" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><i className="fas fa-water"></i> Fetch Waves</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
