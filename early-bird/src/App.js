import './App.scss';
import LandingPage from './components/landing-page/LandingPage';
import HowItWorks from './components/how-it-works/HowItWorks';
import Navbar from './components/navbar/Navbar';
import LoginPage from './components/login-component/LoginPage';
import KeyFeatures from './components/key-features/KeyFeatures';
import CallToAction from './components/call-to-action/CallToAction';
import Footer from './components/footer/Footer';


import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (

    <div>
      <Router>
        <Switch>
          <Route path="/login" exact>
              <Navbar page="login-page"></Navbar>
              <LoginPage></LoginPage>
          </Route>

          <Route path="/" exact>
            <Navbar page="landing-page"></Navbar>
            <LandingPage></LandingPage>
            <div id="hiw-scroll"></div>
            <HowItWorks></HowItWorks>
            <KeyFeatures></KeyFeatures>
            <CallToAction></CallToAction>
            <Footer></Footer>
          </Route>
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Router>
    </div>

    
  );
}

export default App;
