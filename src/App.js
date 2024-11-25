import './App.css';
import { BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login'
import { useState } from 'react';
import Profiles from './pages/profiles/Profiles';
import {Navigate} from "react-router-dom"
import Homepage from "./pages/homepage/Homepage"

function App() {

  const [token,setToken] = useState(null)

  const onLogin = (token) => {
    setToken(token)

  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={token ? <Profiles token={token}/> : <Login onLogin={onLogin}/>}/>
        <Route path="/homepage" element={<Homepage/>} />
      </Routes>
    </Router>
  );
}

export default App;
