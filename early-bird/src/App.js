import './App.scss';
import LandingPage from './components/landing-page/LandingPage';
import HowItWorks from './components/how-it-works/HowItWorks';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';

import LoginPage from './components/login-component/LoginPage';
import KeyFeatures from './components/key-features/KeyFeatures';
import CallToAction from './components/call-to-action/CallToAction';
import Footer from './components/footer/Footer';

import { IsUserLoggedIn, GetRole } from "./services/AccountService";

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
          <Route path="/login" exact
            render={() => (
              IsUserLoggedIn()
                ? <Redirect to='/home'></Redirect>
                : <div>
                  <Navbar page="login-page"></Navbar>
                  <LoginPage></LoginPage>
                </div>
            )} />


          <Route path="/home" exact
            render={() => (
              !IsUserLoggedIn()
                ? <Redirect to='/'></Redirect>
                : <div>
                  <Navbar page="main"></Navbar>
                  <Home></Home>
                </div>
            )} />


          <Route path="/" exact
            render={() => (
              IsUserLoggedIn()
                ? <Redirect to='/home'></Redirect>
                : <div>
                    <Navbar page="landing-page"></Navbar>
                    <LandingPage></LandingPage>
                    <div id="HowItWorks"></div>
                    <HowItWorks></HowItWorks>
                    <KeyFeatures></KeyFeatures>
                    <CallToAction></CallToAction>
                    <Footer></Footer>
                </div>
            )} />


          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Router>
    </div>


  );
}

export default App;
