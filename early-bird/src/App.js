import './App.scss';
import { useEffect, useState} from "react";
import { HubConnectionBuilder } from '@microsoft/signalr';
import LandingPage from './components/landing-page/LandingPage';
import HowItWorks from './components/how-it-works/HowItWorks';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Offers from './components/offers/Offers';
import UserProfile from './components/user-profile/UserProfile';
import LoginPage from './components/login-component/LoginPage';
import KeyFeatures from './components/key-features/KeyFeatures';
import RegisterPage from './components/register-component/RegisterPage';
import CallToAction from './components/call-to-action/CallToAction';
import Footer from './components/footer/Footer';
import AboutPage from './components/about-page/AboutPage';
import ChatPage from './components/chat/ChatPage';
import EditProfilePage from './components/edit-profile-page/EditProfilePage';
import { IsUserLoggedIn } from "./services/AccountService";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {
  const [connection, setConnection] = useState(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(IsUserLoggedIn());

  useEffect(() => {
    if(!isUserLoggedIn) return;
    const newConnection = new HubConnectionBuilder()
        .withUrl(sessionStorage.getItem("server") + '/chat',{
            accessTokenFactory: () =>localStorage.getItem("jwt")
        })
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
}, [isUserLoggedIn]);

useEffect(() => {
  if (connection) {
  connection.start().then(() => {
    console.log("Connected!");
  })
  .catch((e) => console.log("Connection failed: ", e));
  }

}, [connection]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" exact
            render={() => (
              IsUserLoggedIn()
                ? <Redirect to='/home'></Redirect>
                : <div>
                  <Navbar></Navbar>
                  <LoginPage></LoginPage>
                </div>
            )} />
            
             <Route path="/register" exact
            render={() => (
              IsUserLoggedIn()
                ? <Redirect to='/home'></Redirect>
                : <div>
                  <Navbar></Navbar>
                  <RegisterPage></RegisterPage>
                </div>
            )} />

              <Route path="/edit-profile" exact
            render={() => (
              IsUserLoggedIn()
                ? <div>
                <Navbar></Navbar>
                <EditProfilePage></EditProfilePage>
              </div>
                : <Redirect to='/'></Redirect>
            )} />



          <Route path="/home" exact
            render={() => (
              !IsUserLoggedIn()
                ? <Redirect to='/'></Redirect>
                : <div>
                  <Navbar></Navbar>
                  <Home setUserLoggedIn={setUserLoggedIn}></Home>
                </div>
            )} />

          <Route path="/chat" exact
            render={() => (
              !IsUserLoggedIn()
                ? <Redirect to='/'></Redirect>
                : <div>
                  <Navbar page="main"></Navbar>
                  <ChatPage connection={connection}></ChatPage>
                </div>
            )} />

          <Route path="/chat/:isRedirect" exact
            render={() => (
              !IsUserLoggedIn()
                ? <Redirect to='/'></Redirect>
                : <div>
                  <Navbar page="main"></Navbar>
                  <ChatPage connection={connection}></ChatPage>
                </div>
            )} />

          <Route path="/offers/:id" exact
            render={() => (
              !IsUserLoggedIn()
                ? <Redirect to='/'></Redirect>
                : <div>
                  <Navbar></Navbar>
                  <Offers></Offers>
                </div>
            )} />

          <Route path="/users/:id" exact
            render={() => (
              !IsUserLoggedIn()
                ? <Redirect to='/'></Redirect>
                : <div>
                  <Navbar></Navbar>
                  <UserProfile></UserProfile>
                </div>
            )} /> 

          <Route path="/about" exact
            render={() => (
                  <div> 
                  <Navbar></Navbar>
                  <AboutPage></AboutPage>
                  </div>
            )} />
           

          <Route path="/" exact
            render={() => (
              IsUserLoggedIn()
                ? <Redirect to='/home'></Redirect>
                : <div>
                    <Navbar></Navbar>
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
