import './App.scss';
import LandingPage from './components/landing-page/LandingPage';
import HowItWorks from './components/how-it-works/HowItWorks';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';

import LoginPage from './components/login-component/LoginPage';
import KeyFeatures from './components/key-features/KeyFeatures';

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
          <Route path="/home" exact>
              <Navbar page="main"></Navbar>
              <Home></Home>
          </Route>
          <Route path="/" exact>
            <Navbar page="landing-page"></Navbar>
            <LandingPage></LandingPage>
            <HowItWorks></HowItWorks>
            <KeyFeatures></KeyFeatures>
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
