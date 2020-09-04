import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";


import Navbar from './components/Navbar'
import Home from "./components/Home";
import Search from "./components/Search";
import StartPetition from "./components/StartPetition";
import MyPetitions from "./components/MyPetitions";
import Petitions from "./components/Petitions";
import SettingsPage from "./components/SettingsPage";
import { setUser } from "./store/auth";
import { fetchPetitions } from "./store/petitions";
import { fetchUsers } from "./store/users";
import { fetchTopics } from "./store/topics";
import PetitionDetails from './components/PetitionDetails';
import {fetchUserDetails} from './store/auth'
import UpdateForm from './components/UpdateForm'

function App() {
  const token = localStorage.getItem("SESSION_TOKEN");
  const id = localStorage.getItem("USER_ID");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && id) {
      dispatch(fetchUserDetails(token, id))
    }  
  })

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route
            exact path="/"
            component={Home}
          />
          <Route
            path="/start-a-petition"
            component={StartPetition} />
          <Route
            path="/u/me"
            component={MyPetitions} />
          <Route
            path="/petitions"
            component={Petitions} />
          <Route
            path="/p/:header"
            component={PetitionDetails} />
          <Route
            path="/search"
            component={Search} />
          <Route
            path="/settings"
            component={SettingsPage} />
          <Route
            path="/*/updateform"
            component={UpdateForm} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
