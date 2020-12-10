import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import ReportScreen from './screens/ReportScreen'
import SurfSafeScreen from './screens/SurfSafeScreen'
import LoginScreen from './screens/LoginScreen'
import WetsuitGuide from './components/WetsuitGuide'
import Sandbox from './screens/Sandbox'

const App = () => {
  const [current_user, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const fetchUser = async () => {
        const { user }  = await axios.get('/api/users/admin/current')   
        setCurrentUser(user)

    }
    fetchUser()
}, [])

  const changeLoggedIn = (newUser) => {
    setCurrentUser({current_user: newUser})
  }

  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        {current_user?.["_id"]}
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/waveforecast/:endPoint' component={DetailScreen} />
          <Route path='/report/:endPoint' component={ReportScreen} />
          <Route path='/wetsuitguide' component={WetsuitGuide} />
          <Route path='/sandbox' component={Sandbox} />
          {current_user ? (
          <Route path='/surfsafe/:endPoint/:year/:month/:day' component={SurfSafeScreen} />) : (
            <Route path='/surfsafe/:endPoint/:year/:month/:day'>
              <Redirect to='/login-register' />
            </Route>)}
            <Route
                path="/login-register"
                render={props => (
                    <LoginScreen
                        {...props}
                        changeLoggedIn={changeLoggedIn}
                        />
                      )}
                    />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
