import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import fakeData from './fakeData/fakeData';
import Booking from './components/Booking/Booking';
import bgImage from './image/Image/rectangle1.png'
import NoMatch from './components/NoMatch/NoMatch';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [places, setPlaces] = useState([])
  
  useEffect(() => {
    setPlaces(fakeData)
}, []);

  return (
    <UserContext.Provider  value={{places, loggedInUser}}>
    <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgImage})` }} className="body">
     <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login setLoggedInUser={setLoggedInUser} />
            </Route>
            <Route path="/booking/:placeId">
              <Booking/>
            </Route>
            <PrivateRoute path="/checkout">
              <Checkout />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
      </Router>
      </div>
    </UserContext.Provider>
    
  );
}

export default App;
