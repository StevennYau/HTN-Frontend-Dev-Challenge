import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useReducer } from "react";
import { useState, useEffect, React } from "react";
import axios from "axios";
import Info from "./components/Info";
import Login from "./components/Login";

export const USER_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

function userReducer(state, action) {
  console.log("in reducer");
  console.log(action);
  console.log(state);
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      console.log("TRUE");
      return true;
    case USER_ACTIONS.LOGOUT:
      console.log("false");
      return false;
    default:
      console.log("else");
      return state;
  }
}
//export const UserContext = React.createContext();

function App() {
  const [isLoggedIn, dispatch] = useReducer(userReducer, false);
  const uri =
    "https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }";
  const [eventInfo, setEventInfo] = useState();

  useEffect(() => {
    // use axios to hit endpoint and collect data
    axios
      .get(`${uri}`)
      .then((res) => {
        if (eventInfo == null) {
          // only update if eventInfo is empty
          setEventInfo(res.data.data);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [eventInfo]);

  return (
    //<UserContext.Provider value={[isLoggedIn, dispatch]}>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} dispatch={dispatch}/>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  eventInfo={eventInfo}
                  isLoggedIn={isLoggedIn}
                />
              )}
            />
            <Route exact path="/info/:id/:isLoggedIn" component={Info} />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  dispatch={dispatch}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
   // </UserContext.Provider>
      
  );
}

export default App;
