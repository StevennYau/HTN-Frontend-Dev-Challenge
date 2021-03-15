import "./App.css";
import { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import Login from "./components/Login";
import * as React from "react";
import axios from "axios";


// constant of user's possible actions
export const USER_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

// reducer to set state of user's login state
function userReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      return true;
    case USER_ACTIONS.LOGOUT:
      return false;
    default:
      return state;
  }
}

export const UserContext = React.createContext();
export const EventsContext = React.createContext();

function App() {
  const [isLoggedIn, dispatch] = useReducer(userReducer, false);
  const uri =
    "https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }";
  const [eventInfo, setEventInfo] = useState();

  useEffect(() => {
    /** use axios to hit endpoint and collect data */
    axios
      .get(`${uri}`)
      .then((res) => {
        // only update if eventInfo is empty
        if (eventInfo == null) {
          setEventInfo(res.data.data);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [eventInfo]);

  return (
    <UserContext.Provider value={[isLoggedIn, dispatch]}>
      <EventsContext.Provider value={eventInfo}>
        <Router>
          <Navbar />
          <div className="app">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/info/:id/:isLoggedIn" component={Info} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </EventsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
