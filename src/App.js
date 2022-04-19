import React from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route 
} from "react-router-dom";
import Login from './Components/Login';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile';
import PublicFavourites from './Components/PublicFavourites';
import PvtFavourites from './Components/PvtFavourites';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes/>}>
          <Route exact path="/Dashboard" element={ <Dashboard /> } />
          <Route exact path='/PvtFavourites' element = {<PvtFavourites />}/>
          <Route exact path='/Profile' element = {<Profile />}/>
        </Route>
        <Route exact path='/PublicFavourites/:id' element = {<PublicFavourites />}/>
        <Route exact path='/register' element={<Register />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
        
      </Routes>
    </Router>
  );
}
export default App;

