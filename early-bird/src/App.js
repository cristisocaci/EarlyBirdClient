import './App.scss';
import LandingPage from './components/landing-page/LandingPage';
import HowItWorks from './components/how-it-works/HowItWorks';
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <LandingPage></LandingPage>
      <HowItWorks></HowItWorks>
    </div>
  );
}

export default App;
