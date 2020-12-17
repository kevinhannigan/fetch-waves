import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import ReportScreen from './screens/ReportScreen'
import SurfSafeScreen from './screens/SurfSafeScreen'
import SurfSafeCityScreen from './screens/SurfSafeCityScreen'
import LoginScreen from './screens/LoginScreen'
import SurfSafeLandingScreen from './screens/SurfSafeLandingScreen'
import WetsuitGuide from './components/WetsuitGuide'
import Sandbox from './screens/Sandbox'

const App = () => {
  const [current_user, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const fetchUser = async () => {
      let user = await axios.get('/api/users/admin/current')
      let userData = user.data.login_name
      setCurrentUser(userData)
    }
    fetchUser()
  }, [])

  const changeLoggedIn = (newUser) => {
    setCurrentUser(newUser)
  }

  return (
    <BrowserRouter>
      <Header 
        changeLoggedIn={changeLoggedIn} 
        current_user={current_user}
        />
      <main>
        <div className="main-container">
          <Route path='/' component={HomeScreen} exact />
          <Route path='/surfsafe/' component={SurfSafeLandingScreen} exact />
          <Route path='/surfsafe/:endPoint' component={SurfSafeCityScreen} exact />
          <Route path='/waveforecast/:endPoint' component={DetailScreen} />
          <Route path='/report/:endPoint' component={ReportScreen} />
          <Route path='/wetsuitguide' component={WetsuitGuide} />
          <Route path='/sandbox' component={Sandbox} />
          <Route path='/surfsafe/:endPoint/:location/:year/:month/:day'  component={SurfSafeScreen} />
          {!current_user ? (
            <Route
              path="/login-register"
              render={props => (
                <LoginScreen
                  {...props}
                  changeLoggedIn={changeLoggedIn}
                />
              )}
            />

          ) : (
              <Route path='/login-register'>
                <Redirect to='/' />
              </Route>
            )}
          <Route path='/search/:keyword' component={HomeScreen} />
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}


export default App;
