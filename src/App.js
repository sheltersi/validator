import './App.css';

import Navbar from './components/Navbar';
import PhoneNumberValidation from './components/PhoneNumberValidation';
import logo from './logo.svg';

function App() {
  return (
    <div>
    <Navbar/>
    <div className="App">
    <PhoneNumberValidation />
  </div>
  </div>
  );
}

export default App;
