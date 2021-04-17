import './App.scss';
import LandingPage from './components/landing-page/LandingPage';
import HowItWorks from './components/how-it-works/HowItWorks';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';


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
          </Route>
          <Route path="/home" exact>
              <Navbar page="main"></Navbar>
              <Home></Home>
          </Route>
          <Route path="/" exact>
            <Navbar page="landing-page"></Navbar>
            <LandingPage></LandingPage>
            <HowItWorks></HowItWorks>
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
