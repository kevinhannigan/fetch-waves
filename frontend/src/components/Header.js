import React from 'react'
import { Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import SearchBox from './SearchBox'
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
        <header className="custom-header">
            <div className="header-container">
                <div className="header-logo">
                    <Link to='/'>
                        <i className="fas fa-water"></i>
                    </Link>
                </div>
                <div className="header-search">
                    <Route render={({ history }) => <SearchBox history={history} />} />
                </div>
                {/* <div className="header-login">
                    {props?.current_user ? (
                        <div className="login-name">
                            {props?.current_user}<Button onClick={handleLogOut}>Logout  <i className="fas fa-sign-out-alt"></i></Button>
                        </div>) : (
                            <div className="login-name">
                                <Link className='btn btn-primary my-3 px-2' to='/login-register'> Login </Link>
                            </div>
                        )}
                </div> */}
            </div>
        </header>
    )
}

export default Header
