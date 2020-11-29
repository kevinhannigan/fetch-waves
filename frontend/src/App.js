import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import ReportScreen from './screens/ReportScreen'
import WetsuitGuide from './components/WetsuitGuide'

const App = () =>  {
  return (
    <Router>
    <Header />
    <main className='py-3'>
      <Container>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/waveforecast/:endPoint' component={DetailScreen} />
        <Route path='/report/:endPoint' component={ReportScreen} />
        <Route path='/wetsuitguide' component={WetsuitGuide} />
      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
