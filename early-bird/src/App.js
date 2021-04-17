import './App.scss';
import LandingPage from './components/landing-page/LandingPage';
import HowItWorks from './components/how-it-works/HowItWorks';
import Navbar from './components/navbar/Navbar';
import CallToAction from './components/call-to-action/CallToAction';

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

          <Route path="/" exact>
            <Navbar page="landing-page"></Navbar>
            <LandingPage></LandingPage>
            <HowItWorks></HowItWorks>
            <CallToAction></CallToAction>
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
