import './App.css';

import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Fotter from './components/Fotter';
import Contact from './components/Contact';
import Auth from './components/Auth';

function App() {

  return (
    <>
   <Navbar/> 
   <BrowserRouter>
      <Routes>
      <Route path="/Auth" element={<Auth/>} />
      <Route path="/Home"element={<Home/>} />
      <Route path="/" element={<Auth />} />
      <Route path="About" element={<About/>} />
      <Route path="Contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  <Fotter></Fotter>
   
   </>
  );
}

export default App;